export const tpl = `
    <section class="card">
        <header class="text-center">
            <h2>{{ title }}</h2>
        </header>
        
        <form 
            action="/pages/MessengerPage"
            onsubmit="eventBus.emit('{{ submitEventName }}', event)"         
        >
            <div class="form-control">
                <label>Логин:</label>
                <input 
                    name="login" 
                    type="text" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Пароль:</label>
                <input 
                    name="password" 
                    type="password" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
            
            <div class="card__footer">
                <a href="/pages/RegistrationPage" target="_blank">Регистрация</a>
                
                {{{ button }}}
            </div>
        </form>        
    </section>
`;
//# sourceMappingURL=AuthPage.tpl.js.map