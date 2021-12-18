/* eslint-disable no-bitwise */
import { React, useEffect, useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { Container } from "./styled/DrawingArea.styled";

const DrawingArea = ({ clearLines }) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const { height, width } = useWindowDimensions();

    useEffect(() => {}, [clearLines]);

    const randomStrokeColor = `#${((Math.random() * 0xffffff) << 0)
        .toString(16)
        .padStart(6, "0")}`;

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([
            ...lines,
            { points: [pos.x, pos.y], color: randomStrokeColor },
        ]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        const lastLine = lines[lines.length - 1];

        if (lastLine) {
            lastLine.points = lastLine.points.concat([point.x, point.y]);

            lines.splice(lines.length - 1, 1, lastLine);
            setLines(lines.concat());
        }
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <Container>
            <Stage
                width={width}
                height={height}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                className="canvas-stage"
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={2}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                line.tool === "eraser"
                                    ? "destination-out"
                                    : "source-over"
                            }
                        />
                    ))}
                </Layer>
            </Stage>
        </Container>
    );
};

export default DrawingArea;
