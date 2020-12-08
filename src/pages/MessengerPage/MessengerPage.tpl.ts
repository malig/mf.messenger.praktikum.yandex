export const tpl = `
    <section class="card layout">
        <div class="left">
            <section class="toolbar zero-border">
                <h3>Андриенко Алексей</h3>
        
                {{{ profileButton }}}
            </section>
        
            <section class="content">
                {{{ search }}}
        
                {{{ chatList }}}
            </section>
        </div>
        
        <div class="right">
            <section class="toolbar">
                <div class="ava ava_small">
                    <span class="ava__label">Наставник</span>
                </div>
        
                {{{ dropdown }}}
            </section>
        
            <section class="content">
                <ul class="messages">
                    <li class="message message_from">
                        Не дублируйте стили. Если понимаете, что они повторяются, лучше вынести их в отдельный файл.
                    </li>
        
                    <li class="message message_to">
                        Не экономьте буквы, когда называете переменную. Она должна быть понятна в первую очередь человеку,
                        а не компьютеру. Последний всё «стерпит». Название должно максимально отражать суть,
                        быть специфическим для конкретного случая и легко читаться.
                    </li>
                </ul>
            </section>
        
            <section class="footer">
                <form class="sending">
                    <input class="input-fill full-width" name="message"/>
                </form>
        
                {{{ sendButton }}}
            </section>
        </div>
    </section>
`