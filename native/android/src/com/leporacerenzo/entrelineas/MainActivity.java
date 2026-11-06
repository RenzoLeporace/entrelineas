package com.leporacerenzo.entrelineas;
import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.ValueCallback;
import android.webkit.JavascriptInterface;
import android.view.View;
import android.graphics.Color;
import android.widget.Toast;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/** Offline shell. The only bridge writes an explicitly requested save through Android's picker. */
public class MainActivity extends Activity {
  private WebView web;
  private ValueCallback<Uri[]> fileCallback;
  private String pendingSave;
  private static final int PICK_FILE=41,WRITE_SAVE=42;
  @Override public void onCreate(Bundle state){
    super.onCreate(state);
    getWindow().setStatusBarColor(Color.rgb(14,32,30));
    getWindow().setNavigationBarColor(Color.rgb(14,32,30));
    web=new WebView(this);web.setBackgroundColor(Color.rgb(14,32,30));setContentView(web);
    // Leer una escena larga no debe requerir tocar controles para evitar el bloqueo.
    // Esta preferencia solo mantiene despierta la pantalla mientras la vista está visible.
    web.setKeepScreenOn(true);
    web.getSettings().setJavaScriptEnabled(true);web.getSettings().setDomStorageEnabled(true);
    web.getSettings().setAllowFileAccess(true);web.getSettings().setAllowContentAccess(true);
    web.getSettings().setAllowFileAccessFromFileURLs(false);web.getSettings().setAllowUniversalAccessFromFileURLs(false);
    web.getSettings().setMediaPlaybackRequiresUserGesture(true);web.getSettings().setTextZoom(100);
    web.getSettings().setBuiltInZoomControls(false);
    web.setWebViewClient(new WebViewClient(){
      @Override public boolean shouldOverrideUrlLoading(WebView view,String url){return !url.startsWith("file:///android_asset/game/");}
    });
    web.setWebChromeClient(new WebChromeClient(){
      @Override public boolean onShowFileChooser(WebView view,ValueCallback<Uri[]> callback,FileChooserParams params){
        if(fileCallback!=null)fileCallback.onReceiveValue(null);fileCallback=callback;
        Intent pick=new Intent(Intent.ACTION_OPEN_DOCUMENT);pick.setType("*/*");pick.addCategory(Intent.CATEGORY_OPENABLE);
        try{startActivityForResult(pick,PICK_FILE);return true;}catch(Exception ex){fileCallback.onReceiveValue(null);fileCallback=null;return false;}
      }
    });
    web.addJavascriptInterface(new SaveBridge(),"NativeSave");
    if(state==null||web.restoreState(state)==null)web.loadUrl("file:///android_asset/game/index.html");
  }
  public class SaveBridge{
    @JavascriptInterface public void exportSave(String json){
      if(json==null||json.length()>2000000)return;
      runOnUiThread(()->{pendingSave=json;Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT);intent.setType("application/json");intent.addCategory(Intent.CATEGORY_OPENABLE);intent.putExtra(Intent.EXTRA_TITLE,"entrelineas-mi-partida.json");try{startActivityForResult(intent,WRITE_SAVE);}catch(Exception ex){pendingSave=null;Toast.makeText(MainActivity.this,"No se pudo abrir el selector de archivos. Tu partida sigue guardada en este dispositivo.",Toast.LENGTH_LONG).show();}});
    }
  }
  @Override protected void onActivityResult(int request,int result,Intent intent){
    super.onActivityResult(request,result,intent);
    if(request==PICK_FILE){if(fileCallback!=null){fileCallback.onReceiveValue(result==RESULT_OK&&intent!=null&&intent.getData()!=null?new Uri[]{intent.getData()}:null);fileCallback=null;}}
    if(request==WRITE_SAVE){if(result==RESULT_OK&&intent!=null&&pendingSave!=null){boolean written=false;try(OutputStream stream=getContentResolver().openOutputStream(intent.getData())){if(stream==null)throw new java.io.IOException("No se abrió el archivo");stream.write(pendingSave.getBytes(StandardCharsets.UTF_8));written=true;}catch(Exception ex){written=false;}Toast.makeText(this,written?"Copia de la partida guardada.":"No se pudo guardar la copia. Tu partida sigue en este dispositivo; podés intentar otra ubicación.",Toast.LENGTH_LONG).show();}pendingSave=null;}
  }
  @Override protected void onSaveInstanceState(Bundle out){super.onSaveInstanceState(out);web.saveState(out);}
  @Override protected void onPause(){super.onPause();web.onPause();}
  @Override protected void onResume(){super.onResume();if(web!=null)web.onResume();}
  @Override public void onBackPressed(){web.evaluateJavascript("(function(){var d=document.querySelector('dialog');if(d&&d.open){d.close();return true;}if(document.querySelector('.game-shell')){var b=document.querySelector('[data-action=home]');if(b){b.click();return true;}}return false;})()",value->{if(!"true".equals(value))super.onBackPressed();});}
  @Override protected void onDestroy(){if(web!=null){web.removeJavascriptInterface("NativeSave");web.destroy();}super.onDestroy();}
}
