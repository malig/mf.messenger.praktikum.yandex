export const tpl = `
    <section class="card layout">
        <div class="left">
            <section class="toolbar zero-border">
                {{{ logoutButton }}}

                <h3>{{ userName }}</h3>

                {{{ profileButton }}}
            </section>

            <section class="content">
                {{{ addChat }}}

                {{{ chatList }}}
            </section>
        </div>

        <div class="right">
            <section class="toolbar">
                <h3>{{ chatTitle }}</h3>

                {{{ addChatUser }}}
            </section>

            <section class="content messages-container">
                <ul class="messages">
                    {{#each messages}}
                        <li
                          class="message {{#ifEq ../userId this.user_id}}message_to{{else}}message_from{{/ifEq}}"
                        >
                          {{ this.content }}
                        </li>
                    {{/each}}
                </ul>
            </section>

            <section class="footer">
                {{{ addMessage }}}
            </section>
        </div>
    </section>
`;
