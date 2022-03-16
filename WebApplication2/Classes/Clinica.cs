using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Classes
{
    [Serializable]
    public class Clinica
    {
        private String nome;
  
        public int idClinica = 1;
        private List<Paciente> lista = new List<Paciente>();
        
        public Clinica(String nome)
        {
            this.nome = nome;
        }

        public string getNome()
        {
            return nome;
        }

        public void entraPaciente(Paciente p)
        {
            lista.Add(p);
        }
        public void deletaPaciente(Paciente p)
        {
            lista.Remove(p);
        }
        public String relatorio()
        {           
            String a  = String.Format("{0,-10} {1,-25} {2,-25} {3,-5} {4,-10} {5,-10} {6,-15}\n", "ID","Nome","IMC","Sexo","Peso","Altura","Data de Nascimento");
            foreach (Paciente paciente in lista)
            {
                a+=paciente.toString() + "\n";
            }
            return a;
        }

        public Paciente pegaPaciente(int id)
        {
            foreach (Paciente paciente in lista)
            {
                if (id == paciente.getId()) return paciente;
            }
            return null;
        }
        public void encontraMaiorID()
        {
            int max = 0;
            foreach (Paciente p in lista) if(p.getId() > max) max = p.getId();
            Paciente.setContador(max);
        }
    }
}