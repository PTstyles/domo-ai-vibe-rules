#!/usr/bin/env python3
"""
Layout builder for App Studio pages.
Usage: python3 layout-builder.py --layout layout_p1.json --out layout_p1_updated.json

Fill in card_positions and header_positions for your specific app below the
"=== CONFIGURE PER APP ===" marker, then run the script.
"""
import json, copy, argparse

parser = argparse.ArgumentParser()
parser.add_argument('--layout', required=True, help='Input layout JSON from layout-get')
parser.add_argument('--out', required=True, help='Output layout JSON to pass to layout-set')
args = parser.parse_args()

# === CONFIGURE PER APP ===================================================
# Standard grid total width = 60. Compact total width = 12.
# hero=True  → hideTitle/hideSummary/hideBorder/hideMargins/fitToFrame all True, height 14
# filt=True  → same flags True, height 6
# Keys: cardId (integer) → position dict
card_positions = {
    # CARD_ID: {'x': X, 'y': Y, 'w': W, 'h': H, 'cx': CX, 'cy': CY, 'cw': CW, 'ch': CH}
    # Hero:   {'x':  0, 'y': 6,  'w': 15, 'h': 14, 'cx': 0, 'cy': 4, 'cw': 3, 'ch': 6, 'hero': True}
    # Filter: {'x':  0, 'y': 0,  'w': 20, 'h':  6, 'cx': 0, 'cy': 0, 'cw':12, 'ch': 4, 'filt': True}
    # Chart:  {'x':  0, 'y': 24, 'w': 60, 'h': 30, 'cx': 0, 'cy':19, 'cw':12, 'ch':20}
}

# Keys: contentKey (integer from layout-get content array) → header dict
# layout-get auto-creates one HEADER entry (text="Appendix") — reuse its contentKey here.
header_positions = {
    # CONTENT_KEY: {'text': 'Section Title', 'x': 0, 'y': 20, 'w': 60, 'h': 4, 'cx': 0, 'cy': 15, 'cw': 12, 'ch': 3}
}
# =========================================================================

layout = json.load(open(args.layout))

new_content = []
std_template = []
cmp_template = []

# Preserve SEPARATOR (contentKey=0, template-only system entry)
for entry in layout['standard']['template']:
    if entry.get('contentKey', -1) == 0:
        std_template.append({**entry, 'virtual': True, 'virtualAppendix': True})
for entry in layout['compact']['template']:
    if entry.get('contentKey', -1) == 0:
        cmp_template.append({**entry, 'virtual': True, 'virtualAppendix': True})

for c in layout['content']:
    key = c['contentKey']
    entry = copy.deepcopy(c)

    if c['type'] == 'HEADER' and key in header_positions:
        pos = header_positions[key]
        entry.update({'text': pos['text'], 'x': pos['x'], 'y': pos['y'],
                      'width': pos['w'], 'height': pos['h'],
                      'virtual': False, 'virtualAppendix': False})
        new_content.append(entry)
        std_template.append({'contentKey': key, 'type': 'HEADER',
                              'x': pos['x'], 'y': pos['y'], 'width': pos['w'], 'height': pos['h'],
                              'virtual': False, 'virtualAppendix': False, 'children': None})
        cmp_template.append({'contentKey': key, 'type': 'HEADER',
                              'x': pos['cx'], 'y': pos['cy'], 'width': pos['cw'], 'height': pos['ch'],
                              'virtual': False, 'virtualAppendix': False, 'children': None})

    elif c['type'] == 'CARD' and c.get('cardId') in card_positions:
        pos = card_positions[c['cardId']]
        hero = pos.get('hero', False)
        filt = pos.get('filt', False)
        flags = {'hideTitle': hero or filt, 'hideSummary': True,
                 'hideBorder': hero or filt, 'hideMargins': hero or filt,
                 'fitToFrame': hero or filt}
        entry.update({**flags, 'x': pos['x'], 'y': pos['y'],
                      'width': pos['w'], 'height': pos['h'],
                      'virtual': False, 'virtualAppendix': False})
        new_content.append(entry)
        std_template.append({**flags, 'contentKey': key, 'type': 'CARD',
                              'x': pos['x'], 'y': pos['y'], 'width': pos['w'], 'height': pos['h'],
                              'virtual': False, 'virtualAppendix': False, 'style': None, 'children': None})
        cmp_template.append({**flags, 'contentKey': key, 'type': 'CARD',
                              'x': pos['cx'], 'y': pos['cy'], 'width': pos['cw'], 'height': pos['ch'],
                              'virtual': False, 'virtualAppendix': False, 'style': None, 'children': None})

    else:
        entry.update({'virtual': True, 'virtualAppendix': True})
        new_content.append(entry)
        std_template.append({'contentKey': key, 'type': c['type'],
                              'x': 0, 'y': 0, 'width': 15, 'height': 14,
                              'virtual': True, 'virtualAppendix': True, 'style': None, 'children': None})
        cmp_template.append({'contentKey': key, 'type': c['type'],
                              'x': 0, 'y': 0, 'width': 6, 'height': 14,
                              'virtual': True, 'virtualAppendix': True, 'style': None, 'children': None})

layout['content'] = new_content
layout['standard']['template'] = std_template
layout['compact']['template'] = cmp_template
layout['isDynamic'] = False
json.dump(layout, open(args.out, 'w'))

canvas = sum(1 for c in new_content if not c.get('virtualAppendix'))
appx   = sum(1 for c in new_content if c.get('virtualAppendix'))
print(f'Layout written to {args.out}: {canvas} canvas, {appx} appendix')
