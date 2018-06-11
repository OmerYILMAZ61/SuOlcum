package com.example.omer.suolcum.JsHandler;


import android.content.Context;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.TextView;
import android.widget.Toast;

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
    public void showToast(String toast) {
        Toast.makeText(con, toast, Toast.LENGTH_SHORT).show();
    }



}
