using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileCopier
{
   class Program
   {
      static int Main(string[] args)
      {
         if (args.Length < 2
            || string.IsNullOrEmpty(args[0])
            || string.IsNullOrEmpty(args[1]))
         {
            Console.Error.WriteLine("FileCopier Error: arguments are incorrect.");
            return -1;
         }

         Console.WriteLine("FileCopier: start copying...");
         try
         {
            File.Copy(args[0], args[1]);
         }
         catch (Exception e)
         {
            Console.Error.WriteLine("FileCopier Error: " + e.Message);
            return -1;
         }

         Console.WriteLine($"FileCopier copied from {args[0]} to {args[1]}.");
         return 0;
      }
   }
}
