function formatoDataPicker(campo) {

    $(campo).datepicker({
        dateFormat: 'dd/mm/yy', showOtherMonths: true, selectOtherMonths: true,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
    });
}

function mask(o, f) {
    setTimeout(function () {
        var v = mphone(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

function formataValorCambio(campo, evt) {
    //1.000.000,0000
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    if (vr.length > 0) {
        vr = parseFloat(vr.toString()).toString();
        tam = vr.length;

        if (tam == 1)
            campo.value = "0,000" + vr;
        if (tam == 2)
            campo.value = "0,00" + vr;
        if (tam == 3)
            campo.value = "0,0" + vr;
        if (tam == 4)
            campo.value = "0," + vr;

        if ((tam > 4) && (tam <= 7)) {
            campo.value = vr.substr(0, tam - 4) + ',' + vr.substr(tam - 4, tam);
        }
        if ((tam >= 8) && (tam <= 10)) {
            campo.value = vr.substr(0, tam - 7) + '.' + vr.substr(tam - 7, 3) + ',' + vr.substr(tam - 4, tam);
        }
        if ((tam >= 11) && (tam <= 13)) {
            campo.value = vr.substr(0, tam - 10) + '.' + vr.substr(tam - 10, 3) + '.' + vr.substr(tam - 7, 3) + ',' + vr.substr(tam - 4, tam);
        }
        if ((tam >= 14) && (tam <= 16)) {
            campo.value = vr.substr(0, tam - 13) + '.' + vr.substr(tam - 13, 3) + '.' + vr.substr(tam - 10, 3) + '.' + vr.substr(tam - 7, 3) + ',' + vr.substr(tam - 4, tam);
        }
    }
    MovimentaCursor(campo, xPos);
}

function formataValorDigitos(campo, evt, digitos) {

    if (digitos == 0) formataInteiro(campo, evt);
    else
        if (digitos == 2) formataValor(campo, evt);
        else
            if (digitos == 3) formataValor3(campo, evt);
            else
                if (digitos == 4) formataValor4(campo, evt);
                else alert('erro em formata digitos. não existe função para [' + digitos + '] digitos');
}

function formataValor4(campo, evt) {
    //1.000.000,0000
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    if (vr.length > 0) {
        vr = parseFloat(vr.toString()).toString();
        tam = vr.length;

        if (tam == 1) campo.value = "0,000" + vr; if (tam == 2) campo.value = "0,00" + vr; if (tam == 3) campo.value = "0,0" + vr; if (tam == 4)  campo.value = "0," + vr;
        if ((tam > 4) && (tam <= 7)) campo.value = vr.substr(0, tam - 4) + ',' + vr.substr(tam - 4, tam);
        if ((tam >= 8) && (tam <= 10))   campo.value = vr.substr(0, tam - 7) + '.' + vr.substr(tam - 7, 3) + ',' + vr.substr(tam - 4, tam);
        if ((tam >= 11) && (tam <= 13)) campo.value = vr.substr(0, tam - 10) + '.' + vr.substr(tam - 10, 3) + '.' + vr.substr(tam - 7, 3) + ',' + vr.substr(tam - 4, tam);
        if ((tam >= 14) && (tam <= 16)) campo.value = vr.substr(0, tam - 13) + '.' + vr.substr(tam - 13, 3) + '.' + vr.substr(tam - 10, 3) + '.' + vr.substr(tam - 7, 3) + ',' + vr.substr(tam - 4, tam);
    }
    MovimentaCursor(campo, xPos);
}

// Formata o campo valor monetário
function formataValor(campo, evt) {
    //1.000.000,00
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    if (vr.length > 0) {
        vr = parseFloat(vr.toString()).toString();
        tam = vr.length;

        if (tam == 1) campo.value = "0,0" + vr; if (tam == 2) campo.value = "0," + vr;
        if ((tam > 2) && (tam <= 5)) campo.value = vr.substr(0, tam - 2) + ',' + vr.substr(tam - 2, tam);
        if ((tam >= 6) && (tam <= 8)) campo.value = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
        if ((tam >= 9) && (tam <= 11)) campo.value = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
        if ((tam >= 12) && (tam <= 14)) campo.value = vr.substr(0, tam - 11) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
        if ((tam >= 15) && (tam <= 18)) campo.value = vr.substr(0, tam - 14) + '.' + vr.substr(tam - 14, 3) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
    }
    MovimentaCursor(campo, xPos);
}

function formataValor3(campo, evt) {

    //1.000.000,000
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    if (vr.length > 0) {
        vr = parseFloat(vr.toString()).toString();
        tam = vr.length;

        if (tam == 1) campo.value = "0,00" + vr; if (tam == 2) campo.value = "0,0" + vr; if (tam == 3) campo.value = "0," + vr;
        if ((tam > 3)   && (tam <= 6)) campo.value = vr.substr(0, tam - 3) + ',' + vr.substr(tam - 3, tam);
        if ((tam >= 7)  && (tam <= 9))  campo.value = vr.substr(0, tam - 6) + '.' + vr.substr(tam - 6, 3) + ',' + vr.substr(tam - 3, tam);
        if ((tam >= 10)  && (tam <= 12)) campo.value = vr.substr(0, tam - 9) + '.' + vr.substr(tam - 9, 3) + '.' + vr.substr(tam - 6, 3) + ',' + vr.substr(tam - 3, tam);
        if ((tam >= 13) && (tam <= 15)) campo.value = vr.substr(0, tam - 12) + '.' + vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '.' + vr.substr(tam - 6, 3) + ',' + vr.substr(tam - 3, tam);
        if ((tam >= 16) && (tam <= 19)) campo.value = vr.substr(0, tam - 15) + '.' + vr.substr(tam - 15, 3) + '.' + vr.substr(tam - 12, 3) + '.' + vr.substr(tam - 9, 3) + '.' + vr.substr(tam - 6, 3) + ',' + vr.substr(tam - 3, tam);
    }
    MovimentaCursor(campo, xPos);
}




function formataMascara(campo, evt, formato)
{
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;  

    var result = "";
    var maskIdx = formato.length - 1;
    var error = false;
    var valor = campo.value;
    var posFinal = false;
    if (campo.setSelectionRange)
    {
        if (campo.selectionStart == valor.length)
            posFinal = true;
    }
    valor = valor.replace(/[^0123456789Xx]/g, '');
    for (var valIdx = valor.length - 1; valIdx >= 0 && maskIdx >= 0; --maskIdx)
    {
        var chr = valor.charAt(valIdx);
        var chrMask = formato.charAt(maskIdx);
        switch (chrMask)
        {
            case '#':
                if (!(/\d/.test(chr)))
                    error = true;
                result = chr + result;
                --valIdx;
                break;
            case '@':
                result = chr + result;
                --valIdx;
                break;
            default:
                result = chrMask + result;
        }
    }

    campo.value = result;
    campo.style.color = error ? 'red' : '';
    if (posFinal)
    {
        campo.selectionStart = result.length;
        campo.selectionEnd = result.length;
    }
    return result;
}



// Formata data no padrão DD/MM/YYYY
function formataData(campo, evt)
{
    var xPos = PosicaoCursor(campo);
    //dd/MM/yyyy
    evt = getEvent(evt);   

    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;
    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;

   

    if (tam >= 2 && tam < 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2);
    if (tam == 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/';
    if (tam > 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4);

    if (campo.value.length > 10) {
        campo.value = campo.value.substring(0, 10);      
        return;
    }

    MovimentaCursor(campo, xPos);
}

function formataDataHora(campo, evt) {
    var xPos = PosicaoCursor(campo);
    //dd/MM/yyyy hh:mm
    evt = getEvent(evt);

    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;
    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;

  

    if (tam >= 2 && tam < 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2);
    if (tam == 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/';
    if (tam > 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4);

    if (tam == 8)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4, 4) + " ";

    if (tam > 8)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4, 4) + " " + vr.substr(8);

    if (tam == 10)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4, 4) + " " + vr.substr(8, 2) + ":";

    if (tam > 10)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4, 4) + " " + vr.substr(8, 2) + ":" + vr.substring(10);

    MovimentaCursor(campo, xPos);
}


//descobre qual a posição do cursor no campo
function PosicaoCursor(textarea)
{
    var pos = 0;
    if (typeof (document.selection) != 'undefined')
    {
        //IE
        var range = document.selection.createRange();
        var i = 0;
        for (i = textarea.value.length; i > 0; i--)
        {
            if (range.moveStart('character', 1) == 0)
                break;
        }
        pos = i;
    }
    if (typeof (textarea.selectionStart) != 'undefined')
    {
        //FireFox
        pos = textarea.selectionStart;
    }

    if (pos == textarea.value.length)
        return 0; //retorna 0 quando não precisa posicionar o elemento
    else
        return pos; //posição do cursor
}

// move o cursor para a posição pos
function MovimentaCursor(textarea, pos)
{
    if (pos <= 0)
        return; //se a posição for 0 não reposiciona

    if (typeof (document.selection) != 'undefined')
    {
        //IE
        var oRange = textarea.createTextRange();
        var LENGTH = 1;
        var STARTINDEX = pos;

        oRange.moveStart("character", -textarea.value.length);
        oRange.moveEnd("character", -textarea.value.length);
        oRange.moveStart("character", pos);
        //oRange.moveEnd("character", pos);
        oRange.select();
        textarea.focus();
    }
    if (typeof (textarea.selectionStart) != 'undefined')
    {
        //FireFox
        textarea.selectionStart = pos;
        textarea.selectionEnd = pos;
    }
}

//Formata data e hora no padrão DD/MM/YYYY HH:MM
function formataDataeHora(campo, evt)
{
    xPos = PosicaoCursor(campo);
    //dd/MM/yyyy
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;
    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;

    if (tam >= 2 && tam < 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2);
    if (tam == 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/';
    if (tam > 4)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4);
    if (tam > 8 && tam < 11)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4, 4) + ' ' + vr.substr(8, 2);
    if (tam >= 11)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2, 2) + '/' + vr.substr(4, 4) + ' ' + vr.substr(8, 2) + ':' + vr.substr(10);

    campo.value = campo.value.substr(0, 16);
    //    if(xPos == 2 || xPos == 5)
    //        xPos = xPos +1;
    //    if(xPos == 11 || xPos == 14)
    //        xPos = xPos +2;
    MovimentaCursor(campo, xPos);
}

// Formata só números
function formataInteiro(campo, evt)
{
    //1234567890
    xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    campo.value = filtraNumeros(filtraCampo(campo));
    MovimentaCursor(campo, xPos);
}

// Formata hora no padrao HH:MM
function formataHora(campo, evt)
{
    //HH:mm
    xPos = PosicaoCursor(campo);
    evt = getEvent(evt);

    var tecla = getKeyCode(evt);

    if (!teclaValida(tecla))
        return; 

    vr = campo.value = filtraNumeros(filtraCampo(campo));

    tam = vr.length;

    if (tam == 2) campo.value = vr.substr(0, 2) + ':'; 
    if (tam == 3) campo.value = vr.substr(0, 2) + ':' + vr.substr(2, 1);
    if (tam >= 4) campo.value = vr.substr(0, 2) + ':' + vr.substr(2, 2);   

    MovimentaCursor(campo, xPos);
}

// limpa todos os caracteres especiais do campo solicitado
function filtraCampo(campo)
{
    var s = "";
    var cp = "";
    vr = campo.value;
    tam = vr.length;
    for (i = 0; i < tam; i++)
    {
        if (vr.substring(i, i + 1) != "/"
                  && vr.substring(i, i + 1) != "-"
                  && vr.substring(i, i + 1) != "."
                  && vr.substring(i, i + 1) != "("
                  && vr.substring(i, i + 1) != ")"
                  && vr.substring(i, i + 1) != ":"
                  && vr.substring(i, i + 1) != ",")
        {
            s = s + vr.substring(i, i + 1);
        }
    }
    return s;
    //return campo.value.replace("/", "").replace("-", "").replace(".", "").replace(",", "")
}

// limpa todos caracteres que não são números
function filtraNumeros(campo)
{
    var s = "";
    var cp = "";
    vr = campo;
    tam = vr.length;
    for (i = 0; i < tam; i++)
    {
        if (vr.substring(i, i + 1) == "0" ||
                  vr.substring(i, i + 1) == "1" ||
                  vr.substring(i, i + 1) == "2" ||
                  vr.substring(i, i + 1) == "3" ||
                  vr.substring(i, i + 1) == "4" ||
                  vr.substring(i, i + 1) == "5" ||
                  vr.substring(i, i + 1) == "6" ||
                  vr.substring(i, i + 1) == "7" ||
                  vr.substring(i, i + 1) == "8" ||
                  vr.substring(i, i + 1) == "9")
        {
            s = s + vr.substring(i, i + 1);
        }
    }
    return s;
    //return campo.value.replace("/", "").replace("-", "").replace(".", "").replace(",", "")
}

// limpa todos caracteres que não são letras
function filtraCaracteres(campo)
{
    vr = campo;
    for (i = 0; i < tam; i++)
    {
        //Caracter
        if (vr.charCodeAt(i) != 32 && vr.charCodeAt(i) != 94 && (vr.charCodeAt(i) < 65 ||
              (vr.charCodeAt(i) > 90 && vr.charCodeAt(i) < 96) ||
                  vr.charCodeAt(i) > 122) && vr.charCodeAt(i) < 192)
        {
            vr = vr.replace(vr.substr(i, 1), "");
        }
    }
    return vr;
}

// limpa todos caracteres que não são números, menos a vírgula
function filtraNumerosComVirgula(campo)
{
    var s = "";
    var cp = "";
    vr = campo;
    tam = vr.length;
    var complemento = 0; //flag paga contar o número de virgulas
    for (i = 0; i < tam; i++)
    {
        if ((vr.substring(i, i + 1) == "," && complemento == 0 && s != "") ||
                  vr.substring(i, i + 1) == "0" ||
                  vr.substring(i, i + 1) == "1" ||
                  vr.substring(i, i + 1) == "2" ||
                  vr.substring(i, i + 1) == "3" ||
                  vr.substring(i, i + 1) == "4" ||
                  vr.substring(i, i + 1) == "5" ||
                  vr.substring(i, i + 1) == "6" ||
                  vr.substring(i, i + 1) == "7" ||
                  vr.substring(i, i + 1) == "8" ||
                  vr.substring(i, i + 1) == "9")
        {
            if (vr.substring(i, i + 1) == ",")
                complemento = complemento + 1;
            s = s + vr.substring(i, i + 1);
        }
    }
    return s;
}

function formataMesAno(campo, evt)
{
    //MM/yyyy
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;

    if (tam >= 2)
        campo.value = vr.substr(0, 2) + '/' + vr.substr(2);
    MovimentaCursor(campo, xPos);
}

function formataCNPJ(campo, evt) {
    //99.999.999/9999-99
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;

    if (tam >= 2 && tam < 5)
        campo.value = vr.substr(0, 2) + '.' + vr.substr(2);
    else if (tam >= 5 && tam < 8)
        campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(5);
    else if (tam >= 8 && tam < 12)
        campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(5, 3) + '/' + vr.substr(8);
    else if (tam >= 12)
        campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(5, 3) + '/' + vr.substr(8, 4) + '-' + vr.substr(12);
    MovimentaCursor(campo, xPos);
}

function formataCPF(campo, evt) {
    //999.999.999-99
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;
    if (tam >= 3 && tam < 6)
        campo.value = vr.substr(0, 3) + '.' + vr.substr(3);
    else if (tam >= 6 && tam < 9)
        campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6);
    else if (tam >= 9)
        campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6, 3) + '-' + vr.substr(9);
    MovimentaCursor(campo, xPos);
}

function ValidarCNPJ(ObjCnpj) {
  
    if (ObjCnpj.value == '')
        return;
    var cnpj = ObjCnpj.value;
    var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    var dig1 = new Number;
    var dig2 = new Number;

    exp = /\.|\-|\//g
    cnpj = cnpj.toString().replace(exp, "");
    var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));

    for (i = 0; i < valida.length; i++) {
        dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
        dig2 += cnpj.charAt(i) * valida[i];
    }
    dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
    dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

    if (((dig1 * 10) + dig2) != digito)
        alert('CNPJ Inválido!'); 
}
function formataCNPJouCPF(campo, evt)
{
    if (campo.value.length <= 14) {
        formataCPF(campo, evt);       
    }
    else {
        formataCNPJ(campo, evt);
    }
}
function formataDouble(campo, evt)
{
    //18,53012
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    campo.value = filtraNumerosComVirgula(campo.value);
    MovimentaCursor(campo, xPos);
}

function formataTelefone(campo, evt)
{
    //(00) 0000-0000
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;

    if (tam == 1)
        campo.value = '(' + vr;
    else if (tam >= 2 && tam < 6)
        campo.value = '(' + vr.substr(0, 2) + ') ' + vr.substr(2);
    else if (tam >= 6)
        campo.value = '(' + vr.substr(0, 2) + ') ' + vr.substr(2, 4) + '-' + vr.substr(6);

    //(
    //    if(xPos == 1 || xPos == 3 || xPos == 5 || xPos == 9)
    //        xPos = xPos +1
    MovimentaCursor(campo, xPos);
}

function formataTexto(campo, evt, sMascara)
{
    //Nome com Inicial Maiuscula.
    evt = getEvent(evt);
    xPos = PosicaoCursor(campo);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;
    vr = campo.value = filtraCaracteres(filtraCampo(campo));
    tam = vr.length;

    if (sMascara == "Aa" || sMascara == "Xx")
    {
        var valor = campo.value.toLowerCase();
        var count = campo.value.split(" ").length - 1;
        var i;
        var pos = 0;
        var valorIni;
        var valorMei;
        var valorFim;
        valor = valor.substring(0, 1).toUpperCase() + valor.substring(1, valor.length);
        for (i = 0; i < count; i++)
        {
            pos = valor.indexOf(" ", pos + 1);
            valorIni = valor.substring(0, valor.indexOf(" ", pos - 1)) + " ";
            valorMei = valor.substring(valor.indexOf(" ", pos) + 1, valor.indexOf(" ", pos) + 2).toUpperCase();
            valorFim = valor.substring(valor.indexOf(" ", pos) + 2, valor.length);
            valor = valorIni + valorMei + valorFim;
        }
        campo.value = valor;
    }
    if (sMascara == "Aaa" || sMascara == "Xxx")
    {
        var valor = campo.value.toLowerCase();
        var count = campo.value.split(" ").length - 1;
        var i;
        var pos = 0;
        var valorIni;
        var valorMei;
        var valorFim;
        var ligacao = false;
        var chrLigacao = Array("de", "da", "do", "para", "e")
        valor = valor.substring(0, 1).toUpperCase() + valor.substring(1, valor.length);
        for (i = 0; i < count; i++)
        {
            ligacao = false;
            pos = valor.indexOf(" ", pos + 1);
            valorIni = valor.substring(0, valor.indexOf(" ", pos - 1)) + " ";
            for (var a = 0; a < chrLigacao.length; a++)
            {
                if (valor.substring(valorIni.length, valor.indexOf(" ", valorIni.length)).toLowerCase() == chrLigacao[a].toLowerCase())
                {
                    ligacao = true;
                    break;
                }
                else if (ligacao == false && valor.indexOf(" ", valorIni.length) == -1)
                {
                    if (valor.substring(valorIni.length, valor.length).toLowerCase() == chrLigacao[a].toLowerCase())
                    {
                        ligacao = true;
                        break;
                    }
                }
            }
            if (ligacao == true)
            {
                valorMei = valor.substring(valor.indexOf(" ", pos) + 1, valor.indexOf(" ", pos) + 2).toLowerCase();
            }
            else
            {
                valorMei = valor.substring(valor.indexOf(" ", pos) + 1, valor.indexOf(" ", pos) + 2).toUpperCase();
            }
            valorFim = valor.substring(valor.indexOf(" ", pos) + 2, valor.length);
            valor = valorIni + valorMei + valorFim;
        }

        campo.value = valor;
    }
    MovimentaCursor(campo, xPos);
    return true;
}

// Formata o campo CEP
function formataCEP(campo, evt)
{
    //312555-650
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    vr = campo.value = filtraNumeros(filtraCampo(campo));
    tam = vr.length;

    if (tam < 5)
        campo.value = vr;
    else if (tam == 5)
        campo.value = vr + '-';
    else if (tam > 5)
        campo.value = vr.substr(0, 5) + '-' + vr.substr(5);
    MovimentaCursor(campo, xPos);
}

function formataCartaoCredito(campo, evt)
{
    //0000.0000.0000.0000
    var xPos = PosicaoCursor(campo);
    evt = getEvent(evt);
    var tecla = getKeyCode(evt);
    if (!teclaValida(tecla))
        return;

    var vr = campo.value = filtraNumeros(filtraCampo(campo));
    var tammax = 16;
    var tam = vr.length;

    if (tam < tammax && tecla != 8)
    { tam = vr.length + 1; }

    if (tam < 5)
    { campo.value = vr; }
    if ((tam > 4) && (tam < 9))
    { campo.value = vr.substr(0, 4) + '.' + vr.substr(4, tam - 4); }
    if ((tam > 8) && (tam < 13))
    { campo.value = vr.substr(0, 4) + '.' + vr.substr(4, 4) + '.' + vr.substr(8, tam - 4); }
    if (tam > 12)
    { campo.value = vr.substr(0, 4) + '.' + vr.substr(4, 4) + '.' + vr.substr(8, 4) + '.' + vr.substr(12, tam - 4); }
    MovimentaCursor(campo, xPos);
}


//recupera tecla

//evita criar mascara quando as teclas são pressionadas
function teclaValida(tecla)
{
    if (tecla == 8 //backspace
        //Esta evitando o post, quando são pressionadas estas teclas.
        //Foi comentado pois, se for utilizado o evento texchange, é necessario o post.
           || tecla == 9 //TAB
           || tecla == 27 //ESC
           || tecla == 16 //Shif TAB
           || tecla == 45 //insert
           || tecla == 46 //delete
           || tecla == 35 //home
           || tecla == 36 //end
           || tecla == 37 //esquerda
           || tecla == 38 //cima
           || tecla == 39 //direita
           || tecla == 40)//baixo
        return false;
    else
        return true;
}

// recupera o evento do form
function getEvent(evt)
{
    if (!evt) evt = window.event; //IE
    return evt;
}
//Recupera o código da tecla que foi pressionado
function getKeyCode(evt)
{
    var code;
    if (typeof (evt.keyCode) == 'number')
        code = evt.keyCode;
    else if (typeof (evt.which) == 'number')
        code = evt.which;
    else if (typeof (evt.charCode) == 'number')
        code = evt.charCode;
    else
        return 0;

    return code;
}

