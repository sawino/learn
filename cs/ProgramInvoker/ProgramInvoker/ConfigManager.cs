using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;

namespace WnFormTest
{
   internal class ConfigManager
   {
      [DllImport("kernel32")]
      private static extern long WritePrivateProfileString(string section, string key, string val, string filepath);
      // section：category ；key：key；val：value；filePath：full path of ini file。
      [DllImport("kernel32")]
      private static extern int GetPrivateProfileString(string section, string key, string def, StringBuilder retVal, int size, string filePath);

      public ConfigManager()
      {
         ConfigFileLocation = string.Empty;
      }

      public bool Initialize()
      {
         string location = Assembly.GetExecutingAssembly().Location;
         FileInfo exeInfo = new FileInfo(location);
         ConfigFileLocation = Path.Combine(exeInfo.DirectoryName, "config.ini");

         FileInfo configInfo = new FileInfo(ConfigFileLocation);
         if (!configInfo.Exists)
         {
            try
            {
               var file = File.Create(ConfigFileLocation);
               file.Close();
            }
            catch (Exception e)
            {
               return false;
            }
         }         

         return true;
      }

      private string ConfigFileLocation
      {
         get;
         set;
      }

      public void SaveSetting(string key, string value)
      {
         WritePrivateProfileString(string.Empty, key, value, ConfigFileLocation);
      }

      public string GetSetting(string key, string defaultValue)
      {         
         const int size = 512;
         StringBuilder sb = new StringBuilder(size);
         GetPrivateProfileString(string.Empty, key, defaultValue, sb, size, ConfigFileLocation);

         return sb.ToString();
      }
   }
}
