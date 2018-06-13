package com.example.omer.suolcum.JsHandler;


import android.app.Dialog;
import android.content.Context;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

import com.example.omer.suolcum.R;

import java.util.ArrayList;


public class JsHandler {
    String TAG = "JsHandler";
    WebView webView;
    Context con;
    ArrayList<TileEntity> tileList;
    public boolean isStarting = false;

    public JsHandler(final Context context, WebView webHandler) {
        webView = webHandler;
        this.con = context;
        tileList = new ArrayList<TileEntity>();
    }

    /**
     * This function handles call from JS
     */

    @JavascriptInterface
    public void jsQuadKey(String quadkey, String z, String x, String y) {

//        String url="http://ecn.t3.tiles.virtualearth.net/tiles/a"+quadkey+".jpeg?g=1&mkt=en-US";

        if (isStarting)
            tileList.add(new TileEntity(quadkey, z, x, y));

    }
    @JavascriptInterface
    public String showToast(String toast) {
        Toast.makeText(con, toast, Toast.LENGTH_SHORT).show();
        return "tamam";
    }



    @JavascriptInterface
    public void detayGoster() {
        final Dialog dialog = new Dialog(con);
        dialog.setTitle("Kullanıcı Girişi");
        dialog.setContentView(R.layout.detay_dialog);
        dialog.setCancelable(false);
        Button btnIptal = dialog.findViewById(R.id.btnIptal);
        Button btnKaydet = dialog.findViewById(R.id.btnKaydet);

        btnIptal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
            }
        });

        btnKaydet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });
        dialog.show();
    }



}
