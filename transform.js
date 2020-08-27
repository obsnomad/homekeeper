module.exports = ({command, nlu}) => {
    const {tokens, entities, intents} = nlu;
    let action = 'DEFAULT',
        responseText = 'Команда не распознана',
        options = {},
        value;

    if (!command) {
        responseText = 'Привет!';
    }

    else if (~command.indexOf('включи')) {
        action = 'CONDITIONER_ON';
        responseText = 'Включаю кондиционер';
    }

    else if (~command.indexOf('выключи')) {
        action = 'CONDITIONER_OFF';
        responseText = 'Выключаю кондиционер';
    }

    else if ((~command.indexOf('температур') || ~tokens.indexOf('°'))
        && (value = tokens.find(token => !isNaN(token)))) {
        action = 'CONDITIONER_TEMPERATURE';
        options = {
            value: parseInt(value),
        };
        responseText = `Ставлю температуру на ${value} градусов`;
    }

    return {action, responseText, options};
}