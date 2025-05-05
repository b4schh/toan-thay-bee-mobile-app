import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import NoTranslate from "../utils/NoTranslate";

const LatexRenderer = ({ text, className = '', style }) => {
    // Chuyển đổi `\( ... \)` thành `$ ... $` và `\[ ... \]` thành `$$ ... $$`
    if (text === null || text === undefined) return null;
    const formattedText = text
        .replace(/\\\(/g, "$") // Thay \( thành $
        .replace(/\\\)/g, "$") // Thay \) thành $
        .replace(/\\\[/g, "$$") // Thay \[ thành $$
        .replace(/\\\]/g, "$$"); // Thay \] thành $$

    // Phân tách và hiển thị LaTeX đúng định dạng
    const elements = formattedText.split(/(\$\$.*?\$\$|\$.*?\$)/).map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
            return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
        } else if (part.startsWith("$") && part.endsWith("$")) {
            return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
        } else {
            return part;
        }
    });

    return (
        <NoTranslate as="div" className={className} style={style}>
            {elements}
        </NoTranslate>
    );
};

export default LatexRenderer;
