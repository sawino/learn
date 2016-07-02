using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Windows.Forms;

namespace WnFormTest
{
   internal partial class Invoker : Form
   {
      #region KeyItem Class
      class KeyItem
      {
         public KeyItem(Keys key, string str)
         {
            Key = key;
            Str = str;
         }

         public Keys Key
         {
            get;
            set;
         }
         
         public string Str
         {
            get;
            set;
         }

         public override string ToString()
         {
            return Str;
         }
      }

      class ModifierStr
      {
         public static string Alt
         {
            get
            {
               return "Alt";
            }
         }
         public static string Ctrl
         {
            get
            {
               return "Ctrl";
            }
         }
         public static string Shift
         {
            get
            {
               return "Shift";
            }
         }
      }
      #endregion

      #region Constrctor
      public Invoker()
      {
         InitializeComponent();
         Init();
      }
      #endregion

      #region Override Method
      protected override void WndProc(ref Message m)
      {
         // handle keys
         mKeys.ProcessHotKey(m);
         base.WndProc(ref m);
      }

      //protected override CreateParams CreateParams
      //{
      //   get
      //   {
      //      const int WS_EX_APPWINDOW = 0x00040000;
      //      const int WS_EX_TOOLWINDOW = 0x00000080;

      //      CreateParams result = base.CreateParams;
      //      result.ExStyle = result.ExStyle & (~WS_EX_APPWINDOW); // don't show in task bar
      //      result.ExStyle = result.ExStyle | WS_EX_TOOLWINDOW; // alt + tab
      //      return result;
      //   }
      //}
      #endregion

      #region Private Method
      private bool Registered
      {
         get;
         set;
      }

      private ConfigManager ConfigManager
      {
         get;
         set;
      }

      private void Init()
      {
         mComboBoxKeys.Items.Add(new KeyItem(Keys.A, "A"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.B, "B"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.C, "C"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.D, "D"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.E, "E"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.F, "F"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.G, "G"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.H, "H"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.I, "I"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.J, "J"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.K, "K"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.L, "L"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.M, "M"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.N, "N"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.O, "O"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.P, "P"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.Q, "Q"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.R, "R"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.S, "S"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.T, "T"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.U, "U"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.V, "V"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.W, "W"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.X, "X"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.Y, "Y"));
         mComboBoxKeys.Items.Add(new KeyItem(Keys.Z, "Z"));

         mNotificationIcon.Visible = true;
         Registered = false;
         CloseClicked = false;
         OldLocation = Location;
         ConfigManager = new ConfigManager();
      }

      private void ShowHint()
      {
         string hint = GetHint();
         mNotificationIcon.BalloonTipTitle = hint;
         mNotificationIcon.BalloonTipText = "Press shortcut keys to invoke Windows Snipping Tool";
         mNotificationIcon.ShowBalloonTip(1000);

         mNotificationIcon.Text = hint;
      }

      private string GetHint()
      {
         var selectedItem = mComboBoxKeys.SelectedItem as KeyItem;
         if (!Registered || selectedItem == null)
         {
            return "Shortcut key was not set";
         }

         string hint = string.Empty;
         if (mCheckBoxCtrl.Checked)
         {
            hint += ModifierStr.Ctrl;
         }

         if (mCheckBoxAlt.Checked)
         {
            if (hint != string.Empty)
            {
               hint += " + ";
            }

            hint += ModifierStr.Alt;
         }

         if (mCheckBoxShift.Checked)
         {
            if (hint != string.Empty)
            {
               hint += " + ";
            }

            hint += ModifierStr.Shift;
         }

         if (hint != string.Empty)
         {
            hint += " + ";
         }

         hint += selectedItem.Str;

         return hint;
      }

      private void Register()
      {
         var selectedKey = mComboBoxKeys.SelectedItem as KeyItem;
         if (selectedKey == null)
         {
            return;
         }

         Unregister();

         try
         {
            mKeys.Regist(this.Handle, GetModifier(), selectedKey.Key, InvokeAction);
            Registered = true;
         }
         catch (Exception e)
         {
            Registered = false;
         }
      }

      private int GetModifier()
      {
         int val = 0;
         if (mCheckBoxCtrl.Checked)
         {
            val += (int)HotKeys.HotkeyModifiers.Control;
         }

         if (mCheckBoxAlt.Checked)
         {
            val += (int)HotKeys.HotkeyModifiers.Alt;
         }

         if (mCheckBoxShift.Checked)
         {
            val += (int)HotKeys.HotkeyModifiers.Shift;
         }

         return val;
      }

      private void LoadSetting()
      {
         mComboBoxKeys.SelectedIndex = 0;

         mCheckBoxAlt.Checked = bool.Parse(ConfigManager.GetSetting(ModifierStr.Alt, "true"));
         mCheckBoxCtrl.Checked = bool.Parse(ConfigManager.GetSetting(ModifierStr.Ctrl, "true"));
         mCheckBoxShift.Checked = bool.Parse(ConfigManager.GetSetting(ModifierStr.Shift, "false"));

         string key = ConfigManager.GetSetting("Key", "A");
         int size = mComboBoxKeys.Items.Count;

         int index = 0;
         for (int i = 0; i < size; i++)
         {
            var keyItem = mComboBoxKeys.Items[i] as KeyItem;
            if (keyItem != null && keyItem.Str == key)
            {
               index = i;
               break;
            }
         }

         mComboBoxKeys.SelectedIndex = index;
      }

      private void SaveSetting()
      {
         ConfigManager.SaveSetting(ModifierStr.Alt, mCheckBoxAlt.Checked.ToString());
         ConfigManager.SaveSetting(ModifierStr.Shift, mCheckBoxShift.Checked.ToString());
         ConfigManager.SaveSetting(ModifierStr.Ctrl, mCheckBoxCtrl.Checked.ToString());

         var keyItem = mComboBoxKeys.SelectedItem as KeyItem;
         if (keyItem != null)
         {
            ConfigManager.SaveSetting("Key", keyItem.Str);
         }
      }

      private void Unregister()
      {
         mKeys.UnRegist(this.Handle, UnregisterAction);
      }

      private void InvokeAction()
      {
         var programPath = @"C:\windows\System32\snippingtool.exe";
         if (!File.Exists(programPath))
         {
            programPath = @"C:\windows\SysNative\snippingtool.exe";
         }

         if (File.Exists(programPath))
         {
            Process.Start(programPath);
            return;
         }

         ToggleVisibility(true);

         MessageBox.Show("Cannot find the snipping tool.", "Error");
      }

      private void UnregisterAction()
      {
         // placeholder
      }

      void ToggleVisibility(bool isShown)
      {
         if (isShown)
         {
            ShowInTaskbar = true;
            Location = OldLocation;            
            WindowState = FormWindowState.Normal;
            Activate();
         }
         else
         {
            // I don't want to show this dialog in the screen, nor to show it in the Alt + Tab list.
            // To fulfill the second request, this dialog needs to be FixedToolWindow, but it will show in the
            // bottom left corner when set the form status as Minimized. To resolve this issue, I offset the dialog
            // to be out side of the screens.

            OldLocation = Location;
            const int offset = 100;
            int totalWidth = Width + offset;
            int totalHeight = Height + offset;
            foreach (var item in Screen.AllScreens)
            {
               totalWidth += item.Bounds.Width;
               totalHeight += item.Bounds.Height;
            }

            Location = new Point(-totalWidth, -totalHeight);
            ShowInTaskbar = false;            
         }
      }

      private Point OldLocation
      {
         get; set;
      }

      private void DeleteLink()
      {
         string linkPath = GetLinkPath();
         if (System.IO.File.Exists(linkPath))
            System.IO.File.Delete(linkPath);
      }

      private string GetLinkPath()
      {
         return Environment.GetFolderPath(Environment.SpecialFolder.Startup) + "\\" + mLinkName + ".lnk";
      }

      private void CreateLink(string programPath, string description)
      {
         DeleteLink();

         string linkPath = GetLinkPath();

         IWshRuntimeLibrary.WshShell shell;
         IWshRuntimeLibrary.IWshShortcut shortcut;
         try
         {
            shell = new IWshRuntimeLibrary.WshShell();
            shortcut = (IWshRuntimeLibrary.IWshShortcut)shell.CreateShortcut(linkPath);
            shortcut.TargetPath = programPath;// program path
            shortcut.Arguments = "";// arguments
            shortcut.Description = description;// description
            shortcut.WorkingDirectory = System.IO.Path.GetDirectoryName(programPath);// program path
            shortcut.IconLocation = programPath;// icon
            shortcut.WindowStyle = 1;
            shortcut.Save();
         }
         catch (Exception ex)
         {
            System.Windows.Forms.MessageBox.Show("Can't run when startup.", "Error");
         }
         finally
         {
            shell = null;
            shortcut = null;
         }
      }

      private bool CloseClicked
      {
         get;
         set;
      }
      private void Apply()
      {
         ToggleVisibility(false);
         Register();
         SaveSetting();
         ShowHint();
      }
      #endregion

      #region Event Handler
      private void Invoker_Load(object sender, EventArgs e)
      {
         ConfigManager.Initialize();
         LoadSetting();
         ToggleVisibility(false);
         Register();
         SaveSetting();
         ShowHint();
      }
      private void Invoker_FormClosing(object sender, FormClosingEventArgs e)
      {
         if (e.CloseReason == CloseReason.UserClosing && !CloseClicked)
         {
            Apply();
            e.Cancel = true;
            return;
         }

         Unregister();
      }

      private void mButtonApply_Click(object sender, EventArgs e)
      {
         Apply();
      }

      private void mToolStripMenuItemExit_Click(object sender, EventArgs e)
      {
         CloseClicked = true;
         Close();
      }

      private void mNotificationIcon_MouseClick(object sender, MouseEventArgs e)
      {
         if (e.Button == MouseButtons.Left)
         {
            ToggleVisibility(true);
         }
      }

      private void mNotificationIcon_BalloonTipClicked(object sender, EventArgs e)
      {
         ToggleVisibility(true);
      }

      private void mToolStripMenuItemConfig_Click(object sender, EventArgs e)
      {
         ToggleVisibility(true);
      }

      private void Invoker_SizeChanged(object sender, EventArgs e)
      {
         if (WindowState == FormWindowState.Minimized)
         {
            ToggleVisibility(false);
            Register();
            SaveSetting();
            ShowHint();
         }

      }

      private void mToolStripMenuItemAbout_Click(object sender, EventArgs e)
      {
         MessageBox.Show(@"A tool to invoke Windows Snipping Tool using shortcut."
                  + Environment.NewLine
                  + "Created by Samuel Yang" 
                  , "About");
      }
      private void mToolStripMenuItemStartup_CheckedChanged(object sender, EventArgs e)
      {
         if (mToolStripMenuItemStartup.Checked)
         {
            CreateLink(Assembly.GetExecutingAssembly().Location, "Shortcut to SnippingToolInvoker");
         }
         else
         {
            DeleteLink();
         }
      }

      private void mContextMenuStrip_Opening(object sender, CancelEventArgs e)
      {
         mToolStripMenuItemStartup.Checked = File.Exists(GetLinkPath());
      }
      #endregion

      #region Private Member
      HotKeys mKeys = new HotKeys();
      string mLinkName = "SnippingToolInvoker - Shortcut";
      #endregion
   }
}
