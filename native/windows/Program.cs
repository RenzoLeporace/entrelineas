using System;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

[assembly:AssemblyTitle("EntreLíneas: El Archivo de lo Imposible")]
[assembly:AssemblyProduct("EntreLíneas: El Archivo de lo Imposible")]
[assembly:AssemblyCompany("Leporace Renzo")]
[assembly:AssemblyCopyright("Copyright © 2026 Leporace Renzo. Todos los derechos reservados.")]
[assembly:AssemblyVersion("2.1.0.0")]

namespace EntreLineas {
  static class Program {
    internal static string AppRoot;
    internal static readonly bool IsQa=Array.IndexOf(Environment.GetCommandLineArgs(),"--qa")>=0;
    [DllImport("kernel32.dll",CharSet=CharSet.Unicode)] static extern bool SetDllDirectory(string path);
    [STAThread] static void Main() {
      try {
        string baseRoot=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"LeporaceRenzo","EntreLineas");
        AppRoot=Path.Combine(baseRoot,"app-2.1.0-"+Assembly.GetExecutingAssembly().ManifestModule.ModuleVersionId.ToString("N"));Directory.CreateDirectory(AppRoot);
        using(Stream stream=Assembly.GetExecutingAssembly().GetManifestResourceStream("game.zip"))
        using(ZipArchive zip=new ZipArchive(stream,ZipArchiveMode.Read)) {
          foreach(ZipArchiveEntry entry in zip.Entries){
            string file=Path.GetFullPath(Path.Combine(AppRoot,entry.FullName));
            if(!file.StartsWith(Path.GetFullPath(AppRoot)+Path.DirectorySeparatorChar,StringComparison.OrdinalIgnoreCase))throw new InvalidDataException("Archivo fuera del paquete");
            if(entry.FullName.EndsWith("/")){Directory.CreateDirectory(file);continue;}
            Directory.CreateDirectory(Path.GetDirectoryName(file));
            if(!File.Exists(file)||new FileInfo(file).Length!=entry.Length){using(Stream input=entry.Open())using(FileStream output=File.Create(file))input.CopyTo(output);}
          }
        }
        AppDomain.CurrentDomain.AssemblyResolve+=(sender,args)=>{string name=new AssemblyName(args.Name).Name+".dll";string file=Path.Combine(AppRoot,name);return File.Exists(file)?Assembly.LoadFrom(file):null;};
        SetDllDirectory(AppRoot);
        Application.EnableVisualStyles();Application.SetCompatibleTextRenderingDefault(false);
        Run();
      } catch(Exception ex){MessageBox.Show("No se pudo abrir EntreLíneas.\n\n"+ex.Message,"EntreLíneas",MessageBoxButtons.OK,MessageBoxIcon.Error);}
    }
    [MethodImpl(MethodImplOptions.NoInlining)] static void Run(){Application.Run(new GameWindow());}
  }
  class GameWindow:Form {
    WebView2 view; bool fullScreen;Rectangle previousBounds;
    public GameWindow(){
      Text="EntreLíneas: El Archivo de lo Imposible · Leporace Renzo";
      if(Program.IsQa)Text+=" · Pruebas";
      BackColor=Color.FromArgb(14,32,30);MinimumSize=new Size(420,620);Size=new Size(1280,850);StartPosition=FormStartPosition.CenterScreen;
      try{Icon=Icon.ExtractAssociatedIcon(Application.ExecutablePath);}catch{}
      view=new WebView2();view.Dock=DockStyle.Fill;view.DefaultBackgroundColor=BackColor;Controls.Add(view);
      Shown+=async(sender,args)=>{
        try{
          string profile=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"LeporaceRenzo","EntreLineas",Program.IsQa?"perfil-qa":"perfil");
          CoreWebView2Environment env=await CoreWebView2Environment.CreateAsync(null,profile);
          await view.EnsureCoreWebView2Async(env);
          view.CoreWebView2.SetVirtualHostNameToFolderMapping("entrelineas.local",Path.Combine(Program.AppRoot,"game"),CoreWebView2HostResourceAccessKind.DenyCors);
          view.CoreWebView2.Settings.AreDevToolsEnabled=false;
          view.CoreWebView2.Settings.IsStatusBarEnabled=false;
          view.CoreWebView2.Settings.AreDefaultContextMenusEnabled=false;
          view.CoreWebView2.NavigationStarting+=(s,e)=>{Uri uri;if(!Uri.TryCreate(e.Uri,UriKind.Absolute,out uri)||uri.Host!="entrelineas.local")e.Cancel=true;};
          view.CoreWebView2.DownloadStarting+=(s,e)=>{using(SaveFileDialog dlg=new SaveFileDialog()){dlg.Title="Guardar partida de EntreLíneas";dlg.Filter="Partida JSON|*.json";dlg.FileName="entrelineas-mi-partida.json";if(dlg.ShowDialog(this)==DialogResult.OK){e.ResultFilePath=dlg.FileName;e.Handled=true;}else e.Cancel=true;}};
          KeyPreview=true;
          view.KeyDown+=(s,e)=>{if(e.KeyCode==Keys.F11){e.Handled=true;ToggleFullScreen();}};
          view.Source=new Uri("https://entrelineas.local/index.html");
        }catch(WebView2RuntimeNotFoundException){MessageBox.Show(this,"Esta aplicación necesita Microsoft Edge WebView2 Runtime, incluido en Windows actualizado. Podés instalarlo desde la página oficial de Microsoft y volver a abrir el juego.\n\nhttps://developer.microsoft.com/microsoft-edge/webview2/","Falta WebView2",MessageBoxButtons.OK,MessageBoxIcon.Information);Close();}
        catch(Exception ex){MessageBox.Show(this,ex.Message,"Error al iniciar",MessageBoxButtons.OK,MessageBoxIcon.Error);Close();}
      };
    }
    void ToggleFullScreen(){if(!fullScreen){previousBounds=Bounds;FormBorderStyle=FormBorderStyle.None;WindowState=FormWindowState.Maximized;}else{WindowState=FormWindowState.Normal;FormBorderStyle=FormBorderStyle.Sizable;Bounds=previousBounds;}fullScreen=!fullScreen;}
    protected override void Dispose(bool disposing){if(disposing&&view!=null)view.Dispose();base.Dispose(disposing);}
  }
}
