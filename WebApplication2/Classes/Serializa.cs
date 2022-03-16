using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Classes;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

namespace ClinicaWEB.Classes
{
    [Serializable]
    public class Serializa
    {
        public static void save(Clinica clinica)
        {
            try
            {
                FileStream fs = new FileStream("C:\\clinica.dat", FileMode.Create);
                BinaryFormatter serializer = new BinaryFormatter();
                serializer.Serialize(fs, clinica);
                fs.Close();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static Clinica load()
        {
            try
            {
                if (!File.Exists("C:\\clinica.dat")) return null;
                FileStream fs = new FileStream("C:\\clinica.dat", FileMode.Open);
                BinaryFormatter formatter = new BinaryFormatter();
                Clinica clinica = (Clinica)formatter.Deserialize(fs);
                fs.Close();
                return clinica;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}