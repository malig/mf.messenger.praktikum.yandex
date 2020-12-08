export const tpl = `
    <button class="{{ className }}" onclick="eventBus.emit('{{ clickEventName }}')">       
        {{#if title}}
            {{ title }}
        {{else if faIco}}
            <i class="fa {{ faIco }}" aria-hidden="true"></i>
        {{/if}}
    </button>
`