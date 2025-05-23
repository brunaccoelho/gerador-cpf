const DIGITOS_CPF_SEM_VERIFICADOR = 9
const DIGITOS_CPF = 11

export function gerarDV( cpf ) {
    checarCPF( cpf, DIGITOS_CPF_SEM_VERIFICADOR )

    // Passo 1
    let soma = 0;
    for( let i = 0; i < DIGITOS_CPF_SEM_VERIFICADOR; i++ ) {
        soma += Number( cpf[ i ] ) * ( 10 - i );
    }

    let dv1 = ( soma % 11 ) ;
    dv1 = dv1 < 2 ? 0 : ( 11 - dv1 );

    cpf += dv1.toString();

    // Passo 2
    soma = 0;
    for( let i = 0; i < DIGITOS_CPF_SEM_VERIFICADOR + 1; i++ ) {
        soma += Number( cpf[ i ] ) * ( 11 - i );
    }

    let dv2 = soma % 11;
    dv2 = dv2 < 2 ? 0 : ( 11 - dv2 );

    return dv1.toString() + dv2.toString();
}

    // Lembrete:
    //           0  1 2 3 4 5 6 7 8 
    // PASSO 1: 10 9 8 7 6 5 4 3 2 
    //     multiplicação dos dígitos pelos valores
    //     soma tudo e tira o módulo com 11
    //     se o resto for 0 ou 1 -> dígito é 0
    //     senão                 -> dígito é 11 - resto 
    // PASSO 2:
    //     adiciona o DV ao CPF
    //     0  1 2 3 4 5 6 7 8 X
    //    11 10 9 8 7 6 5 4 3 2
    //     repete o cálculo do passo 1

function checarCPF( cpf, digitos ) {
    if( typeof cpf !== 'string' )
        throw new Error( 'O valor do CPF deve ser uma string' )

    if( cpf.length !== digitos ) {
        throw new Error( `O CPF deve ter ${digitos} dígitos` )
    }

    if( ! /^[0-9]+$/.test( cpf ) ) {
        throw new Error( `O CPF deve ter ${digitos} dígitos numéricos` )
    }
}

export function validarCPF( cpf ) {
    checarCPF( cpf, DIGITOS_CPF )

    const cpfSemDv = cpf.substring( 0, DIGITOS_CPF_SEM_VERIFICADOR )
    return gerarDV( cpfSemDv ) === cpf.substring( cpfSemDv.length );

}

function randomInt( min, max ) {
    return min + Math.trunc( Math.random() * ((max - min) + 1) ) 
}

function gerarNumeros( quantidade ) {
    let cpf = '';
    for( let i = 0; i < quantidade; i++ ) {
        cpf += randomInt( 0, 9 ).toString();
    }

    return cpf;
}

export function gerarCPF() {
    const digitosSemDV = gerarNumeros( DIGITOS_CPF_SEM_VERIFICADOR );
    return digitosSemDV + gerarDV( digitosSemDV );
}

// Crie uma função validarCPF com os respectivos testes
// -> Se desejado, modifique a função checarCPF para checar o CPF antes de validar seu DV

// 2) Crie uma função gerarCPF, com seus testes, que gere um CPF aleatório, com dígito verificador correto
