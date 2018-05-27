import { PURPLE_COLOR, SYMBOL_WIDTH } from '../../store/constants';

export const drawCodeCrumbEdge = (
    draw,
    shiftToCenterPoint,
    { target, source, parentName }
) => {
    const nameWidth = SYMBOL_WIDTH * parentName.length;
    const padding = 40;
    const edgeTurnDistance = 20;

    const P1 = shiftToCenterPoint(source.x + nameWidth + padding, source.y);

    const P2 = shiftToCenterPoint(target.x - edgeTurnDistance, source.y);
    const P3 = shiftToCenterPoint(target.x - edgeTurnDistance, target.y);
    const P4 = shiftToCenterPoint(target.x, target.y);

    const polyline = draw.polyline([
        [P1.x, P1.y],
        [P2.x, P2.y],
        [P3.x, P3.y],
        [P4.x, P4.y]
    ]);

    polyline.fill('none').stroke({
        color: PURPLE_COLOR
    });

    return polyline;
};

export const drawPartEdge = (
    draw,
    shiftToCenterPoint,
    { source, parentName }
) => {
    const nameWidth = SYMBOL_WIDTH * parentName.length;
    const padding = 17;

    const P1 = shiftToCenterPoint(source.x + nameWidth + padding, source.y);
    const P2 = { x: P1.x + padding + 6, y: P1.y };

    const polyline = draw.polyline([[P1.x, P1.y], [P2.x, P2.y]]);

    polyline.fill('none').stroke({
        color: PURPLE_COLOR
    });

    const smallLine = draw
        .line(P1.x, P1.y - 2, P1.x, P1.y + 2)
        .stroke({ color: PURPLE_COLOR });

    return [polyline, smallLine];
};

export const drawCodeCrumbLoc = (
    draw,
    shiftToCenterPoint,
    { x, y, name = '', loc, singleCrumb, onClick, onMouseOver }
) => {
    const textPointShiftX = 3;
    const textPointShiftY = 5;
    const textPoint = shiftToCenterPoint(singleCrumb ? x - 20 : x, y);

    const locWidth = loc.length * 6;
    const locRec = draw
        .rect(locWidth, 12)
        .fill('#fff')
        .stroke(PURPLE_COLOR)
        .move(textPoint.x, textPoint.y - 6);

    const locText = draw.text(loc);
    locText
        .font({ fill: '#595959', family: 'Menlo', size: '8px' })
        .style({cursor: 'pointer'})
        .move(textPoint.x + textPointShiftX, textPoint.y - textPointShiftY);

    if (onMouseOver) {
        locText.on('mouseover', () =>
            onMouseOver({ x: textPoint.x, y: textPoint.y - 15 })
        );
    }
    if (onClick) {
        locText.on('click', onClick);
    }

    if (name) {
        const nameText = draw.text(':' + name);
        nameText.font({ fill: '#595959', family: 'Menlo', size: '12px' });
        //TODO: refactor to use one way, plus or minus
        nameText.move(
            textPoint.x + textPointShiftX + locWidth - 1,
            textPoint.y - textPointShiftY - 2
        );

        return [locRec, locText, nameText];
    }

    return [locRec, locText];
};
