using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CSLanguage
{
   class Test
   {
      public static void RunTest()
      {
         // method extension
         //var str = "hello";
         //Log(str.StringToInt().ToString());   

         // async await
         //var obj = new AsyncAWait();
         //obj.Display();
         //Log("should be displayed before Display()");
         //Thread.Sleep(2000);
         //Log("end");  

         // anonymous object
         //var obj = new { Name = "S" };
         //Log(obj.Name);

         // initializer
         //var obj = new Initializer() { Pro = "H" };
         //obj.Log(obj.Pro);

         // Generic method
         //GenericClass.Print<Base>(new Base());

         // Generic delegate
         // last one is the return value
         //var obj = new Func<int, string>(DelegateMethod);
         //Log(obj(1));

         //var obj2 = new Action<object>(Log);
         //obj2(3);

         // yield
         // 3 should not be called         
         //foreach (var item in new Yielder().GetEnumerator())
         //{
         //   if (item == 2)
         //   {
         //      break;
         //   }

         //   Log(item);
         //}

         // LINQ
         var customers = new List<Customer>()
         {
            new Customer() {Name="S" },
            new Customer() {Name="Z" }
         };

         var orders = new List<Order>
         {
            new Order() { Customer=customers[0], Count = 1, Item = "Pig" },
            new Order() { Customer=customers[0], Count = 2, Item = "Monkey" },
            new Order() { Customer=customers[1], Count = 3, Item = "Pig" },
            new Order() { Customer=customers[1], Count = 4, Item = "Monkey" },
            new Order() { Customer=customers[1], Count = 5, Item = "Chicken" }
         };

         var q1 = from v in customers
                  where v.Name == "S"
                  select v;
         Log(q1.Count());

         var q2 = from c in customers
                  join o in orders on c.Name equals o.Customer.Name
                  into tempOrders
                  select new
                  {
                     c.Name,
                     Count = tempOrders.Count()
                  };
         foreach (var item in q2)
         {
            Log(item.Name + ": " + item.Count.ToString());
         }

         var q3 = from o in orders
                  where o.Count >= 2
                  let p = o
                  orderby p.Count descending
                  select p;
         foreach (var item in q3)
         {
            Log(item.Count);
         }


         var q4 = from o in orders
                  group o by o.Customer into g
                  select new
                  {
                     g.Key,
                     NumProducts = g.Count(),
                     Order = g
                  };

         foreach (var item in q4)
         {            
            Log(item.Key.Name + " Count: " + item.NumProducts);
            foreach (var p in item.Order)
            {
               Log(p.Item);
            }
         }
      }

      public static void Log(object str)
      {
         Console.WriteLine(str.ToString());
      }

      public static string DelegateMethod(int d)
      {
         return "Delegate";
      }
      
   }   

   class Customer
   {
      public string Name
      {
         get; set;
      }
   }

   class Order
   {
      public Customer Customer
      {get; set; }

      public string Item
      { get; set; }

      public int Count
      { get; set; }
      
   }

   class Yielder
   {
      public IEnumerable<int> GetEnumerator()
      {
         this.Log("hey 1");
         yield return 1;
         this.Log("hey 2");
         yield return 2;
         this.Log("hey 3");
         yield return 3;
      }
   }

   class Base
   {

   }
   class GenericClass
   {
      public static void Print<T>(T o) where T: Base
      {
         o.Log("GenericClass");
      }
   }

   class Initializer
   {
      public string Pro
      { get; set; }
   }

   // must be static class and static method
   public static class Extensions
   {
      // pay attention to "this string", more args are supported.
      public static int StringToInt(this string val)
      {
         return 99;
      }

      public static void Log(this object obj, object str)
      {
         Test.Log(str);
      }
   }

   class AsyncAWait
   {
      public async void Display()
      {
         double result = await Calc();
         Test.Log(result.ToString());
      }

      private Task<double> Calc()
      {
         return Task.Run(() =>
         {
            Test.Log("sleeping..");
            Thread.Sleep(1000);
            Test.Log("awaken");
            return 0.99;
         });
      }
   }
}
