export const tpl = `
    <section class="card">
        <header class="text-center">
            <h2>{{ title }}</h2>
        </header>
        
        <form 
            action="/pages/AuthPage"
            onsubmit="eventBus.emit('{{ submitEventName }}', event)"             
        >
            <div class="form-control">
                <label>Имя:</label>
                <input 
                    name="first_name" 
                    type="text" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)"  
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Фамилия:</label>
                <input 
                    name="second_name" 
                    type="text" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)"  
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
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
                <label>Адрес электронной почты:</label>
                <input 
                    name="email" 
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
        
            <div class="form-control">
                <label>Телефон:</label>
                <input 
                    name="phone" 
                    type="tel" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)"  
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
            
            <div class="card__footer">
                {{{ button }}}
            </div>
        </form>        
    </section>
`;
//# sourceMappingURL=RegistrationPage.tpl.js.map