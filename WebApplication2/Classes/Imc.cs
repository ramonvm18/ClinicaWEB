using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Classes
{
    [Serializable]
    public class Imc
    {
        private float peso;
        private float altura;

        public float getPeso()
        {
            return peso;
        }

        public float getAltura()
        {
            return altura;
        }
        public void setPeso(float peso)
        {
            this.peso = peso;
        }
        public void setAltura(float altura)
        {
            this.altura = altura;
        }


        public Imc(float peso, float altura)
        {
            this.peso = peso;
            this.altura = altura;
        }

        public float calcula()
        {
            return peso / (altura * altura);
        }

        public String discute()
        {
            float resultado = calcula();

            if (resultado < 17) return "Muito abaixo do peso";
            if (resultado < 18.5) return "Abaixo do peso";
            if (resultado < 25) return "Peso normal";
            if (resultado < 30) return "Acima do peso";
            if (resultado < 35) return "Obesidade I";
            if (resultado < 40) return "Obesidade II (severa)";
            return "Obesidade III (mórbida)";
        }
    }
}