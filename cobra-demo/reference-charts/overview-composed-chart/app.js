import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ComposedChart, Line, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

const DATASET_ALIAS = 'productiondata';

const COLORS = {
  actual:   '#23272E',
  plan:     '#3B82C8',
  forecast: '#0D9488',
  band:     '#3B82C8',
  grid:     '#D5DAE2',
  text:     '#23272E',
  textSec:  '#64748B',
  today:    '#64748B',
};

const fetchData = async () => {
  if (typeof domo !== 'undefined' && typeof domo.get === 'function' &&
      window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return await domo.get(`/data/v1/${DATASET_ALIAS}`);
  }
  const resp = await fetch('/api/data');
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return await resp.json();
};

const parseData = (rawData) => {
  if (!rawData || rawData.length === 0) return [];

  let headers, rows;
  if (Array.isArray(rawData[0])) {
    headers = rawData[0].map(h => h.toUpperCase().replace(/\./g, '_'));
    rows = rawData.slice(1);
  } else {
    headers = Object.keys(rawData[0]).map(h => h.toUpperCase().replace(/\./g, '_'));
    rows = rawData.map(row => Object.keys(row).map(k => row[k]));
  }

  const col = (name) => headers.findIndex(h => h === name || h.includes(name));
  const dateIdx        = col('ORDERDATE');
  const actualIdx      = col('UNITSPRODUCED');
  const planIdx        = col('PLANNEDUNITS');
  const forecastIdx    = col('FORECASTUNITS');
  const fLowerIdx      = col('FORECASTLOWER');
  const fUpperIdx      = col('FORECASTUPPER');

  if (dateIdx === -1) return [];

  return rows
    .map(row => ({
      date:     new Date(row[dateIdx]),
      actual:   parseFloat(row[actualIdx]) || null,
      plan:     parseFloat(row[planIdx]) || null,
      forecast: parseFloat(row[forecastIdx]) || null,
      fLower:   parseFloat(row[fLowerIdx]) || null,
      fUpper:   parseFloat(row[fUpperIdx]) || null,
    }))
    .filter(d => !isNaN(d.date.getTime()));
};

const aggregateData = (data, period) => {
  const grouped = {};

  data.forEach(item => {
    let key;
    const d = item.date;
    switch (period) {
      case 'week': {
        const s = new Date(d);
        s.setDate(d.getDate() - d.getDay());
        key = s.toISOString().split('T')[0];
        break;
      }
      case 'month':
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
        break;
      default:
        key = d.toISOString().split('T')[0];
    }
    if (!grouped[key]) grouped[key] = { date: key, aS: 0, aC: 0, pS: 0, pC: 0, fS: 0, fC: 0, lS: 0, lC: 0, uS: 0, uC: 0 };
    const g = grouped[key];
    if (item.actual != null)   { g.aS += item.actual;   g.aC++; }
    if (item.plan != null)     { g.pS += item.plan;     g.pC++; }
    if (item.forecast != null) { g.fS += item.forecast;  g.fC++; }
    if (item.fLower != null)   { g.lS += item.fLower;   g.lC++; }
    if (item.fUpper != null)   { g.uS += item.fUpper;   g.uC++; }
  });

  return Object.values(grouped)
    .map(g => ({
      date:     g.date,
      actual:   g.aC > 0 ? g.aS : null,
      plan:     g.pC > 0 ? g.pS : null,
      forecast: g.fC > 0 ? g.fS : null,
      confidenceRange: (g.lC > 0 && g.uC > 0) ? [g.lS, g.uS] : null,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

const fmtNum = (v) => {
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(0)}K`;
  return `${Math.round(v)}`;
};

const fmtDate = (s, period) => {
  const d = new Date(s);
  if (period === 'month') return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  if (period === 'week')  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const calcTickInterval = (dataLength) => {
  if (dataLength <= 30) return 0;
  if (dataLength <= 90) return 6;
  if (dataLength <= 180) return 13;
  return Math.ceil(dataLength / 18) - 1;
};

const DailyTick = ({ x, y, payload, data }) => {
  const dateStr = payload.value;
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const idx = data.findIndex(d => d.date === dateStr);
  const firstOfMonth = data.findIndex(d => {
    const dd = new Date(d.date);
    return dd.getMonth() === month && dd.getFullYear() === year;
  });
  const showMonth = idx === firstOfMonth;

  return React.createElement('g', { transform: `translate(${x},${y})` },
    React.createElement('text', { x: 0, y: 0, dy: 12, textAnchor: 'middle', fill: COLORS.textSec, fontSize: 10 }, day),
    showMonth && React.createElement('text', {
      x: 0, y: 0, dy: 26, textAnchor: 'middle', fill: COLORS.textSec, fontSize: 10, fontWeight: 500
    }, date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))
  );
};

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = new Date(label);
  const fmt = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const pt = payload[0]?.payload;

  return React.createElement('div', { className: 'custom-tooltip' },
    React.createElement('p', { className: 'tooltip-date' }, fmt),
    pt?.actual != null   && React.createElement('p', { style: { color: COLORS.actual } },   `Actual: ${fmtNum(pt.actual)}`),
    pt?.plan != null     && React.createElement('p', { style: { color: COLORS.plan } },     `Plan: ${fmtNum(pt.plan)}`),
    pt?.forecast != null && React.createElement('p', { style: { color: COLORS.forecast } }, `Forecast: ${fmtNum(pt.forecast)}`),
    pt?.confidenceRange  && React.createElement('p', { style: { color: COLORS.textSec } },
      `Band: ${fmtNum(pt.confidenceRange[0])} – ${fmtNum(pt.confidenceRange[1])}`)
  );
};

const ProductionChart = () => {
  const [rawData, setRawData] = useState([]);
  const [aggregation, setAggregation] = useState('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfidence, setShowConfidence] = useState(true);

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchData();
        setRawData(parseData(data));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (typeof domo !== 'undefined' && typeof domo.onFiltersUpdate === 'function') {
      domo.onFiltersUpdate(async () => {
        try {
          const data = await fetchData();
          setRawData(parseData(data));
        } catch (err) {
          setError(err.message);
        }
      });
    }
  }, []);

  const chartData = useMemo(() => aggregateData(rawData, aggregation), [rawData, aggregation]);

  const todayInRange = chartData.length > 0 &&
    new Date(chartData[0].date) <= new Date(today) &&
    new Date(chartData[chartData.length - 1].date) >= new Date(today);

  if (loading) {
    return React.createElement('div', { className: 'loading-container' },
      React.createElement('div', { className: 'loading-grid' },
        ...[0,1,2,3,4,5,6,7,8].map(i =>
          React.createElement('div', { key: i, className: 'loading-cell', style: { animationDelay: `${(i % 3) * 0.1}s` } })
        )
      ),
      React.createElement('p', null, 'Loading...')
    );
  }

  if (error) {
    return React.createElement('div', { className: 'error-container' },
      React.createElement('h2', null, 'Error Loading Data'),
      React.createElement('p', null, error)
    );
  }

  const dateRange = chartData.length > 0
    ? `${new Date(chartData[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${new Date(chartData[chartData.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    : '';

  return React.createElement('div', { className: 'chart-container' },
    React.createElement('div', { className: 'chart-header' },
      React.createElement('div', { className: 'chart-title-section' },
        React.createElement('h1', null, 'Production Volume vs. Target'),
        React.createElement('p', { className: 'chart-subtitle' },
          `${dateRange}, by ${aggregation === 'day' ? 'Day' : aggregation === 'week' ? 'Week' : 'Month'}`)
      ),
      React.createElement('div', { className: 'chart-controls' },
        React.createElement('select', {
          value: aggregation,
          onChange: (e) => setAggregation(e.target.value),
          className: 'aggregation-select'
        },
          React.createElement('option', { value: 'day' }, 'Daily'),
          React.createElement('option', { value: 'week' }, 'Weekly'),
          React.createElement('option', { value: 'month' }, 'Monthly')
        ),
        React.createElement('button', {
          className: `confidence-toggle ${showConfidence ? 'active' : ''}`,
          onClick: () => setShowConfidence(!showConfidence)
        }, React.createElement('span', { className: 'toggle-icon' }, '◉'), 'Confidence')
      )
    ),

    React.createElement('div', { className: 'chart-wrapper', key: `w-${aggregation}` },
      React.createElement(ResponsiveContainer, { width: '100%', height: '100%' },
        React.createElement(ComposedChart, {
          data: chartData, margin: { top: 10, right: 20, left: 10, bottom: 20 }
        },
          React.createElement('defs', null,
            React.createElement('linearGradient', { id: 'bandGrad', x1: '0', y1: '0', x2: '0', y2: '1' },
              React.createElement('stop', { offset: '0%', stopColor: COLORS.band, stopOpacity: 0.35 }),
              React.createElement('stop', { offset: '100%', stopColor: COLORS.band, stopOpacity: 0.10 })
            )
          ),

          React.createElement(CartesianGrid, { strokeDasharray: '3 3', stroke: COLORS.grid, vertical: false }),

          React.createElement(XAxis, {
            dataKey: 'date',
            tickFormatter: (d) => fmtDate(d, aggregation),
            stroke: COLORS.textSec, fontSize: 11, tickLine: false,
            axisLine: { stroke: COLORS.grid },
            interval: aggregation === 'day' ? calcTickInterval(chartData.length) : 'preserveStartEnd',
            height: 30,
            angle: chartData.length > 60 && aggregation === 'day' ? -35 : 0,
            textAnchor: chartData.length > 60 && aggregation === 'day' ? 'end' : 'middle'
          }),

          React.createElement(YAxis, {
            tickFormatter: fmtNum, stroke: COLORS.textSec, fontSize: 12,
            tickLine: false, axisLine: false,
            label: { value: 'Units', angle: -90, position: 'insideLeft',
              style: { textAnchor: 'middle', fill: COLORS.textSec, fontSize: 12 } }
          }),

          React.createElement(Tooltip, { content: React.createElement(ChartTooltip) }),

          showConfidence && React.createElement(Area, {
            type: 'monotone', dataKey: 'confidenceRange', stroke: 'none',
            fill: 'url(#bandGrad)', fillOpacity: 1, name: 'Confidence Band', legendType: 'none'
          }),

          todayInRange && React.createElement(ReferenceLine, {
            x: today, stroke: COLORS.today, strokeDasharray: '4 4',
            label: { value: 'Today', position: 'top', fill: COLORS.today, fontSize: 11 }
          }),

          React.createElement(Line, {
            type: 'monotone', dataKey: 'plan', stroke: COLORS.plan,
            strokeWidth: 2, dot: false,
            activeDot: { r: 4, fill: COLORS.plan }, name: 'Plan', connectNulls: true
          }),

          React.createElement(Line, {
            type: 'monotone', dataKey: 'actual', stroke: COLORS.actual,
            strokeWidth: 2, dot: false,
            activeDot: { r: 4, fill: COLORS.actual }, name: 'Actual', connectNulls: false
          }),

          React.createElement(Line, {
            type: 'monotone', dataKey: 'forecast', stroke: COLORS.forecast,
            strokeWidth: 2, strokeDasharray: '4 3', dot: false,
            activeDot: { r: 4, fill: COLORS.forecast }, name: 'Forecast', connectNulls: false
          })
        )
      )
    ),

    React.createElement('div', { className: 'chart-footer' },
      React.createElement('div', { className: 'legend-item' },
        React.createElement('span', { className: 'legend-line solid actual' }),
        React.createElement('span', null, 'Actual')
      ),
      React.createElement('div', { className: 'legend-item' },
        React.createElement('span', { className: 'legend-line solid plan' }),
        React.createElement('span', null, 'Plan')
      ),
      React.createElement('div', { className: 'legend-item' },
        React.createElement('span', { className: 'legend-line dashed forecast' }),
        React.createElement('span', null, 'Forecast')
      ),
      showConfidence && React.createElement('div', { className: 'legend-item' },
        React.createElement('span', { className: 'legend-box' }),
        React.createElement('span', null, 'Confidence Band')
      )
    )
  );
};

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(ProductionChart));
