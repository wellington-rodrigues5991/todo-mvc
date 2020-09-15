module.exports = {
    screens: {'sm': '640px', 'md': '899px', 'lg': '1024px', 'xl': '1280px'},
    inset: {
        '0': '0px',
        '-1': '-1px',
        '10': '10px',
        '-110': '-113px',
        '-65': '-65px',
        '40': '40px',
        '-300': '-300px',
        '8': '8px',
        '20': '21px',
        '5': '4px'
    },
    backgroundPosition: {
        'pos': '-0.5px center'
    },
    extend: {
        backgroundImage:{
        "uncheck": "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')",
        "check": "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')"
        },
        boxShadow:{
        'double' : '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
        'inset': 'inset 0 -2px 1px rgba(0,0,0,0.03)',
        'outline': '0 0 0 1px rgba(175, 47, 47, 0.2);',
        'hoverline': '0 0 0 1px rgba(175, 47, 47, 0.1);',
        'triple': '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)'
        },
        colors: {
            red: {
                '100': 'rgba(175, 47, 47, 0.1)',
                '150': 'rgba(175, 47, 47, 0.15)',
                '200': '#cc9a9a',
                '300': '#af5b5e',
                '400': '#b83f45'
            },
            gray: {
                '50': 'rgba(255, 255, 255, .6)',
                '100': '#f5f5f5',
                '200': '#e6e6e6',
                '250': '#ededed',
                '300': 'rgba(0, 0, 0, 0.003)',
                '310': 'rgba(0, 0, 0, .04)',
                '350': '#bfbfbf',
                '400': '#4d4d4d',
                '450': '#d9d9d9',
                '500': '#c5c5c5',
                '700': '#777',
                '780': '#787e7e'
            }
        },
        fontFamily: {'general': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']},
        fontSize:{'100' : '100px', '10' : '10px', '14': '14px', '15': '15px', '24': '24px', '1xl': '1.375rem'},
        lineHeight: {'big' : '3', '6': '1.35em', '7': '1.40em', '20': '19px', 'tight': '1.2', 'tight2': '1.3'},
        maxWidth: {'550' : '550px', '3/5' : '80%'},
        spacing: {
            '65': '65px',
            '1015': '3px 15px 5px',
            '15r': '.15rem',
            '15': '15px',
            '16': '16.5px 16px 16px 16px',
            '43px': '43px',
            '60': '60px',
            '12px': '12px',
            '34': '34px',
            '4px': '4px',
            '3px7px': '2px 7px 4px',
            '3px': '3.5px 0px  0px 3px',
            '300': '300px',
            '272': '292px',
            '10': '10px',
            '22': '22px',
            '20': '21px',
            '25': '25px',
            '30': '30px'
        }
    }
}