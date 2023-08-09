const theme = {
    handleChange: function(event) {
        const themeSelected = event.currentTarget.value;
        const styleElt = document.querySelector('.opt-theme');
        switch (themeSelected) {
            case 'burger':
                styleElt.href = "css/burger-style.css";
                break;
            case 'poke':
                styleElt.href = "css/poke-style.css";
                break;
        }
    }
}