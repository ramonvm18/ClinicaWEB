using ClinicaWEB.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebApplication2.Classes;

namespace WebApplication2
{
    public partial class _Default : Page
    {
        public static Clinica clinica;
        protected void Page_Load(object sender, EventArgs e)
        {
            clinica = Serializa.load();
            if (clinica == null) clinica = new Clinica("Clínica de estética Corporal do Ramon Fischer");
            clinica.encontraMaiorID();
            txRelatorio.Text = clinica.relatorio();
            inicializaLabels();
        }

        private void inicializaLabels()
        {
            lbAltura.Text = "Altura";
            lbDataNascimento.Text = "Data Nascimento";
            lbFem.Text = "Fem";
            lbMasc.Text = "Masc";
            lbNome.Text = "Nome";
            lbPeso.Text = "Peso";
            lbSexo.Text = "Sexo";

            lbTitulo.Text = clinica.getNome();
        }
        private bool valida()
        {
            double peso, altura;

            if (!Double.TryParse(txAltura.Text, out altura))
            {
                mensagem.Text = "Erro na altura digitada";
                txAltura.Focus();
                return false;
            }
            if (!Double.TryParse(txPeso.Text, out peso))
            {
                mensagem.Text = "Erro no peso digitada";
                txPeso.Focus();
                return false; 
            }

            DateTime dataNascimento;
            if (!DateTime.TryParse(txDataNascimento.Text, out dataNascimento))
            {
                mensagem.Text = "Erro na data de nascimento";
                txDataNascimento.Focus();
                return false; 

            }

            dataNascimento = DateTime.Parse(txDataNascimento.Text);
            DateTime dataInicial = new DateTime(1920, 01, 01);
            if (DateTime.Now.CompareTo(dataNascimento) < 0)
            {
                mensagem.Text = "Erro na data de nascimento";
                txDataNascimento.Focus();
                return false;
            }
            if (dataInicial.CompareTo(dataNascimento) > 0)
            {
                mensagem.Text = "Erro na data de nascimento";
                txDataNascimento.Focus();
                return false;
            }

            if (!rbMasc.Checked && !rbFem.Checked)
            {
                mensagem.Text = "Erro no registro do sexo";
                return false;
            }
            return true;
        }

        protected void btOk_Click(object sender, EventArgs e)
        {
            if (!valida()) return;
            double peso, altura;
            DateTime dataNascimento;

            Double.TryParse(txAltura.Text, out altura);
            Double.TryParse(txPeso.Text, out peso);
            DateTime.TryParse(txDataNascimento.Text, out dataNascimento);

            Paciente paciente = new Paciente(txNome.Text, rbMasc.Checked ? 'M' : 'F', (float)peso, (float)altura, dataNascimento);
            clinica.entraPaciente(paciente);
            txRelatorio.Text = clinica.relatorio();
            try
            {
                Serializa.save(clinica);
            }
            catch (Exception)
            {
                mensagem.Text = "Erro ao carregar dados";
            }
            limpa();
        }
        protected void btBusca_Click(object sender, EventArgs e)
        {           
            Paciente paciente = clinica.pegaPaciente(int.Parse(txId.Text));
            if (paciente == null)
            {
                mensagem.Text = "Nao foi encontrado nenhum paciente";
            }
            else mostraPaciente(paciente);
        }
        protected void btAtualiza_Click(object sender, EventArgs e)
        {
            if (txId.Text == "") { mensagem.Text = "ID não localizado"; }
            else
            {
                DateTime dataNascimento;
                Paciente paciente = clinica.pegaPaciente(int.Parse(txId.Text));
                dataNascimento = DateTime.Parse(txDataNascimento.Text);
                paciente.setNome(txNome.Text);
                paciente.setDataNascimento(dataNascimento);
                paciente.setSexo(rbMasc.Checked ? 'M' : 'F');
                paciente.setPeso(float.Parse(txPeso.Text));
                paciente.setAltura(float.Parse(txAltura.Text));
                limpa();
                txRelatorio.Text = clinica.relatorio();
                try
                {
                    Serializa.save(clinica);
                }
                catch (Exception)
                {
                    mensagem.Text = "Erro ao carregar dados";
                }
            }
        }
        protected void btDeleta_Click(object sender, EventArgs e)
        {
            if (txId.Text == "") { mensagem.Text = "ID não localizado"; }
            else
            {
                Paciente paciente = clinica.pegaPaciente(int.Parse(txId.Text));
                clinica.deletaPaciente(paciente);
                limpa();
                txRelatorio.Text = clinica.relatorio();
                try
                {
                    Serializa.save(clinica);
                }
                catch (Exception)
                {
                    mensagem.Text = "Erro ao carregar dados";
                }
            }
        }

        protected void mostraPaciente(Paciente paciente)
        {
            txNome.Text = paciente.getNome();
            txAltura.Text = paciente.getAltura() + "";
            txPeso.Text = paciente.getPeso() + "";
            txDataNascimento.Text = paciente.getDataNascimento().ToString("dd/MM/yyyy");
            rbMasc.Checked = paciente.getSexo() == 'M';
            rbFem.Checked = paciente.getSexo() == 'F';
        }

        protected void limpa()
        {
            txNome.Text = "";
            txAltura.Text = "";
            txPeso.Text = "";
            txId.Text = "";
            txDataNascimento.Text = "";
            rbFem.Checked = false;
            rbMasc.Checked = false;
        }
    }
}