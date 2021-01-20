export const tpl = `
    <div class="add-chat">
        <input
            class="add-chat__input zero-border"
            type="text"
            onchange="eventBus.emit('{{ changeTitleEventName }}', event)"
            placeholder="Создай чат"
        />

        {{{ button }}}
    </div>
`;
