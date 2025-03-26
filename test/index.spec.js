import { describe, it, expect } from "vitest"
import { gerarDV, validarCPF, gerarCPF } from '../src/index.js'

describe( gerarDV.name, () => {
    it( 'lança exceção se o CPF não for string', () => {
        expect( () => {
            gerarDV( 123456789 )
        } ).toThrow( /string/i )
    })

    it( 'CPF deve ter 9 dígitos numéricos', () => {
        expect( () => {
            gerarDV( '12345678' )
        } ).toThrow( /9/i )
    })

    it( 'aceita apenas dígitos numéricos', () => {
        expect( () => {
            gerarDV( '12345678A' )
        } ).toThrow( /9/i )

        expect( () => {
            gerarDV( '123.567.A' )
        } ).toThrow( /numérico/i )
    })

    it( 'gera o DV corretamente', () => {
        const resultado = gerarDV('688732790');
        expect( resultado ).toBe( '23' );
    })
})

describe(  validarCPF.name, () => {
    it( 'lança exceção se o CPF não for string', () => {
        expect( () => {
            validarCPF( 123456789 )
        } ).toThrow( /string/i )
    })

    it( 'CPF deve ter 11 dígitos numéricos', () => {
        expect( () => {
            validarCPF( '123456788' )
        } ).toThrow( /11/i )
    })

    it( 'aceita apenas dígitos numéricos', () => {
        expect( () => {
            validarCPF( '12345678A' )
        } ).toThrow( /11/i )

        expect( () => {
            validarCPF( '123.567.AA1' )
        } ).toThrow( /numérico/i )
    })

    it( 'valida o DV corretamente', () => {
        const resultado = validarCPF('68873279023');
        expect( resultado ).toBeTruthy();
    })
} )

describe( gerarCPF.name, () => {
    it( 'gera CPF válido', () => {
        const cpf = gerarCPF();
        const resultado = validarCPF( cpf );
        expect( resultado ).toBeTruthy();
    } )
})