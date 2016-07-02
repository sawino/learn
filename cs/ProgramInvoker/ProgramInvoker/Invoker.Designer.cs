namespace WnFormTest
{
   partial class Invoker
   {
      /// <summary>
      /// Required designer variable.
      /// </summary>
      private System.ComponentModel.IContainer components = null;

      /// <summary>
      /// Clean up any resources being used.
      /// </summary>
      /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
      protected override void Dispose(bool disposing)
      {
         if (disposing && (components != null))
         {
            components.Dispose();
         }
         base.Dispose(disposing);
      }

      #region Windows Form Designer generated code

      /// <summary>
      /// Required method for Designer support - do not modify
      /// the contents of this method with the code editor.
      /// </summary>
      private void InitializeComponent()
      {
         this.components = new System.ComponentModel.Container();
         System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Invoker));
         this.mCheckBoxCtrl = new System.Windows.Forms.CheckBox();
         this.mCheckBoxAlt = new System.Windows.Forms.CheckBox();
         this.mCheckBoxShift = new System.Windows.Forms.CheckBox();
         this.mComboBoxKeys = new System.Windows.Forms.ComboBox();
         this.mButtonApply = new System.Windows.Forms.Button();
         this.mNotificationIcon = new System.Windows.Forms.NotifyIcon(this.components);
         this.mContextMenuStrip = new System.Windows.Forms.ContextMenuStrip(this.components);
         this.mToolStripMenuItemConfig = new System.Windows.Forms.ToolStripMenuItem();
         this.mToolStripMenuItemStartup = new System.Windows.Forms.ToolStripMenuItem();
         this.mToolStripMenuItemAbout = new System.Windows.Forms.ToolStripMenuItem();
         this.mToolStripMenuItemExit = new System.Windows.Forms.ToolStripMenuItem();
         this.mContextMenuStrip.SuspendLayout();
         this.SuspendLayout();
         // 
         // mCheckBoxCtrl
         // 
         this.mCheckBoxCtrl.AutoSize = true;
         this.mCheckBoxCtrl.Location = new System.Drawing.Point(12, 12);
         this.mCheckBoxCtrl.Name = "mCheckBoxCtrl";
         this.mCheckBoxCtrl.Size = new System.Drawing.Size(41, 17);
         this.mCheckBoxCtrl.TabIndex = 0;
         this.mCheckBoxCtrl.Text = "Ctrl";
         this.mCheckBoxCtrl.UseVisualStyleBackColor = true;
         // 
         // mCheckBoxAlt
         // 
         this.mCheckBoxAlt.AutoSize = true;
         this.mCheckBoxAlt.Location = new System.Drawing.Point(59, 12);
         this.mCheckBoxAlt.Name = "mCheckBoxAlt";
         this.mCheckBoxAlt.Size = new System.Drawing.Size(38, 17);
         this.mCheckBoxAlt.TabIndex = 1;
         this.mCheckBoxAlt.Text = "Alt";
         this.mCheckBoxAlt.UseVisualStyleBackColor = true;
         // 
         // mCheckBoxShift
         // 
         this.mCheckBoxShift.AutoSize = true;
         this.mCheckBoxShift.Location = new System.Drawing.Point(103, 12);
         this.mCheckBoxShift.Name = "mCheckBoxShift";
         this.mCheckBoxShift.Size = new System.Drawing.Size(47, 17);
         this.mCheckBoxShift.TabIndex = 2;
         this.mCheckBoxShift.Text = "Shift";
         this.mCheckBoxShift.UseVisualStyleBackColor = true;
         // 
         // mComboBoxKeys
         // 
         this.mComboBoxKeys.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
         this.mComboBoxKeys.FormattingEnabled = true;
         this.mComboBoxKeys.Location = new System.Drawing.Point(12, 35);
         this.mComboBoxKeys.Name = "mComboBoxKeys";
         this.mComboBoxKeys.Size = new System.Drawing.Size(132, 21);
         this.mComboBoxKeys.TabIndex = 3;
         // 
         // mButtonApply
         // 
         this.mButtonApply.Location = new System.Drawing.Point(45, 64);
         this.mButtonApply.Name = "mButtonApply";
         this.mButtonApply.Size = new System.Drawing.Size(75, 23);
         this.mButtonApply.TabIndex = 4;
         this.mButtonApply.Text = "Apply";
         this.mButtonApply.UseVisualStyleBackColor = true;
         this.mButtonApply.Click += new System.EventHandler(this.mButtonApply_Click);
         // 
         // mNotificationIcon
         // 
         this.mNotificationIcon.BalloonTipIcon = System.Windows.Forms.ToolTipIcon.Info;
         this.mNotificationIcon.ContextMenuStrip = this.mContextMenuStrip;
         this.mNotificationIcon.Icon = ((System.Drawing.Icon)(resources.GetObject("mNotificationIcon.Icon")));
         this.mNotificationIcon.Text = "SnippingToolInvoker";
         this.mNotificationIcon.Visible = true;
         this.mNotificationIcon.BalloonTipClicked += new System.EventHandler(this.mNotificationIcon_BalloonTipClicked);
         this.mNotificationIcon.MouseClick += new System.Windows.Forms.MouseEventHandler(this.mNotificationIcon_MouseClick);
         // 
         // mContextMenuStrip
         // 
         this.mContextMenuStrip.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mToolStripMenuItemConfig,
            this.mToolStripMenuItemStartup,
            this.mToolStripMenuItemAbout,
            this.mToolStripMenuItemExit});
         this.mContextMenuStrip.Name = "mContextMenuStrip";
         this.mContextMenuStrip.Size = new System.Drawing.Size(190, 92);
         this.mContextMenuStrip.Opening += new System.ComponentModel.CancelEventHandler(this.mContextMenuStrip_Opening);
         // 
         // mToolStripMenuItemConfig
         // 
         this.mToolStripMenuItemConfig.Name = "mToolStripMenuItemConfig";
         this.mToolStripMenuItemConfig.Size = new System.Drawing.Size(189, 22);
         this.mToolStripMenuItemConfig.Text = "Config";
         this.mToolStripMenuItemConfig.Click += new System.EventHandler(this.mToolStripMenuItemConfig_Click);
         // 
         // mToolStripMenuItemStartup
         // 
         this.mToolStripMenuItemStartup.CheckOnClick = true;
         this.mToolStripMenuItemStartup.Name = "mToolStripMenuItemStartup";
         this.mToolStripMenuItemStartup.Size = new System.Drawing.Size(189, 22);
         this.mToolStripMenuItemStartup.Text = "Run as system startup";
         this.mToolStripMenuItemStartup.CheckedChanged += new System.EventHandler(this.mToolStripMenuItemStartup_CheckedChanged);
         // 
         // mToolStripMenuItemAbout
         // 
         this.mToolStripMenuItemAbout.Name = "mToolStripMenuItemAbout";
         this.mToolStripMenuItemAbout.Size = new System.Drawing.Size(189, 22);
         this.mToolStripMenuItemAbout.Text = "About";
         this.mToolStripMenuItemAbout.Click += new System.EventHandler(this.mToolStripMenuItemAbout_Click);
         // 
         // mToolStripMenuItemExit
         // 
         this.mToolStripMenuItemExit.Name = "mToolStripMenuItemExit";
         this.mToolStripMenuItemExit.Size = new System.Drawing.Size(189, 22);
         this.mToolStripMenuItemExit.Text = "Exit";
         this.mToolStripMenuItemExit.Click += new System.EventHandler(this.mToolStripMenuItemExit_Click);
         // 
         // Invoker
         // 
         this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
         this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
         this.ClientSize = new System.Drawing.Size(156, 99);
         this.Controls.Add(this.mButtonApply);
         this.Controls.Add(this.mComboBoxKeys);
         this.Controls.Add(this.mCheckBoxShift);
         this.Controls.Add(this.mCheckBoxAlt);
         this.Controls.Add(this.mCheckBoxCtrl);
         this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
         this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
         this.MaximizeBox = false;
         this.MinimizeBox = false;
         this.Name = "Invoker";
         this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
         this.Text = "STInvoker-By SY";
         this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Invoker_FormClosing);
         this.Load += new System.EventHandler(this.Invoker_Load);
         this.SizeChanged += new System.EventHandler(this.Invoker_SizeChanged);
         this.mContextMenuStrip.ResumeLayout(false);
         this.ResumeLayout(false);
         this.PerformLayout();

      }

      #endregion

      private System.Windows.Forms.CheckBox mCheckBoxCtrl;
      private System.Windows.Forms.CheckBox mCheckBoxAlt;
      private System.Windows.Forms.CheckBox mCheckBoxShift;
      private System.Windows.Forms.ComboBox mComboBoxKeys;
      private System.Windows.Forms.Button mButtonApply;
      private System.Windows.Forms.NotifyIcon mNotificationIcon;
      private System.Windows.Forms.ContextMenuStrip mContextMenuStrip;
      private System.Windows.Forms.ToolStripMenuItem mToolStripMenuItemExit;
      private System.Windows.Forms.ToolStripMenuItem mToolStripMenuItemConfig;
      private System.Windows.Forms.ToolStripMenuItem mToolStripMenuItemAbout;
      private System.Windows.Forms.ToolStripMenuItem mToolStripMenuItemStartup;
   }
}

