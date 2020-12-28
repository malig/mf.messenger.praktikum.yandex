export const tpl = `
    <section class="card">
        <header class="text-center">
            <h2>{{ title }}</h2>
        </header>
        
        <form onsubmit="eventBus.emit('{{ submitEventName }}', event)">
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
                {{{ registrationButton }}}
                {{{ button }}}
            </div>
        </form>        
    </section>
`