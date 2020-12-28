export const tpl = `
    <button class="{{ className }}" onclick="eventBus.emit('{{ clickEventName }}', event)">       
        {{#if title}}
            {{ title }}
        {{else if faIco}}
            <i class="fa {{ faIco }}" aria-hidden="true"></i>
        {{/if}}
    </button>
`