export const tpl = `
    <form class="sending">
        <input
            class="input-fill full-width"
            onchange="eventBus.emit('{{ changeMessageEventName }}', event)"
        />
    </form>

    {{{ button }}}
`;
