module.exports = {
    inset: {
        '0': '0px',
        '-1': '-1px',
        '10': '10px',
        '-110': '-113px',
        '-65': '-65px',
        '40': '40px'
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
            },
            gray: {
                '100': '#f5f5f5',
                '200': '#e6e6e6',
                '250': '#ededed',
                '300': 'rgba(0, 0, 0, 0.003)',
                '350': '#bfbfbf',
                '400': '#4d4d4d',
                '450': '#d9d9d9',
                '700': '#777'
            }
        },
        fontFamily: {'general': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']},
        fontSize:{'100' : '100px', '10' : '10px', '1xl': '1.375rem'},
        lineHeight: {'big' : '3'},
        maxWidth: {'550' : '550px', '3/5' : '80%'},
        spacing: {
            '65': '65px',
            '1015': '7.1px 15px 8.9px',
            '15r': '.15rem',
            '15': '17px',
            '16': '18.5px',
            '43px': '43px',
            '60': '60px',
            '12px': '12px',
            '34': '34px',
            '3px7px': '2px 7px 4px',
            '3px': '3.5px 0px  0px 3px'
        }
    }
}