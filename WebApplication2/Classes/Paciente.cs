using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Classes
{
    [Serializable]
    public class Paciente
    {
        private int id;

        private static int contador;

        private DateTime dataNascimento;

        private String nome;

        private char sexo;

        private Imc imc;

        public String getNome()
        {
            return nome;
        }

        public DateTime getDataNascimento()
        {
            return dataNascimento;
        }

        public char getSexo()
        {
            return sexo;
        }

        public float getPeso()
        {
            return imc.getPeso();
        }

        public float getAltura()
        {
            return imc.getAltura();
        }
        public void setNome(string nome)
        {
            this.nome = nome;
        }

        public void setDataNascimento(DateTime data)
        {
            this.dataNascimento = data;
        }

        public void setSexo(char sexo)
        {
             this.sexo = sexo;
        }

        public void setPeso(float peso)
        {
            this.imc.setPeso(peso);
        }

        public void setAltura(float altura)
        {
            this.imc.setAltura(altura);
        }
        public static void setContador(int max)
        {
            contador = max;
        }


        public Paciente(String nome, char sexo, float peso, float altura, DateTime dataNascimento)
        {

            this.id = ++contador;

            this.nome = nome;
            this.sexo = sexo;
            this.dataNascimento = dataNascimento;

            imc = new Imc(peso, altura);

        }

        public int getId()
        {
            return id;
        }

        public String diagnosticoPeso()
        {
            return imc.discute();
        }

        public String toString()
        {
            return String.Format("{0,-10} {1,-25} {2,-25} {3,-5} {4,-10} {5,-10} {6,-15}", id.ToString("D6"),nome.Trim(),diagnosticoPeso().Trim(),sexo.ToString(),getPeso()+"", getAltura()+"",dataNascimento.ToString("dd/MM/yyyy"));
        }
    }
}