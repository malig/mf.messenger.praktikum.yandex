export const tpl = `
    <div class="add-chat-user">
        <input
            class="add-chat-user__input zero-border"
            type="text"
            onchange="eventBus.emit('{{ changeUserNameEventName }}', event)"
            placeholder="Добавь пользователя в чат"
            {{#if disabled}}disabled{{/if}}
        />

        {{{ button }}}
    </div>
`;
