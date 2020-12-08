export const render = (query, block) => {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(block.getContent());
    }
};
//# sourceMappingURL=utils.js.map