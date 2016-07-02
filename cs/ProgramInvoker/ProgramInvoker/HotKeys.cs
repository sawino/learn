using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows.Forms;

namespace WnFormTest
{
   internal class HotKeys
   {
      [DllImport("user32.dll")]
      static extern bool RegisterHotKey(IntPtr hWnd, int id, int modifiers, Keys vk);
      [DllImport("user32.dll")]
      static extern bool UnregisterHotKey(IntPtr hWnd, int id);


      int keyid = 10;     // identify shortcuts
      Dictionary<int, HotKeyCallBackHanlder> keymap = new Dictionary<int, HotKeyCallBackHanlder>();   // key - handler map
      public delegate void HotKeyCallBackHanlder();

      // modifiers
      public enum HotkeyModifiers
      {
         Alt = 1,
         Control = 2,
         Shift = 4,
         Win = 8
      }

      // register shortcuts
      public void Regist(IntPtr hWnd, int modifiers, Keys vk, HotKeyCallBackHanlder callBack)
      {
         int id = keyid++;
         if (!RegisterHotKey(hWnd, id, modifiers, vk))
            throw new Exception("Can't register shortcut.");
         keymap[id] = callBack;
      }

      // unregister shortcuts
      public void UnRegist(IntPtr hWnd, HotKeyCallBackHanlder callBack)
      {
         //foreach (KeyValuePair<int, HotKeyCallBackHanlder> var in keymap)
         //{
         //   if (var.Value == callBack)
         //   {
         //      UnregisterHotKey(hWnd, var.Key);
         //      return;
         //   }
         //}

         foreach (KeyValuePair<int, HotKeyCallBackHanlder> var in keymap)
         {
            UnregisterHotKey(hWnd, var.Key);
         }

         keymap.Clear();
      }

      // shortcut handler
      public void ProcessHotKey(Message m)
      {
         if (m.Msg == 0x312)
         {
            int id = m.WParam.ToInt32();
            HotKeyCallBackHanlder callback;
            if (keymap.TryGetValue(id, out callback))
               callback();
         }
      }
   }

}
