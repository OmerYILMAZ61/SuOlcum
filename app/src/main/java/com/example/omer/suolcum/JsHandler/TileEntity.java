package com.example.omer.suolcum.JsHandler;

/**
 * Created by NODA_HP_1 on 24.3.2017.
 */
public class TileEntity {
    String QuadKey;
    String X;
    String Y;
    String Z;

    public TileEntity() {
    }

    public TileEntity(String quadKey, String z, String x, String y) {
        QuadKey = quadKey;
        X = x;
        Y = y;
        Z = z;
    }

    public String getQuadKey() {
        return QuadKey;
    }

    public void setQuadKey(String quadKey) {
        QuadKey = quadKey;
    }

    public String getX() {
        return X;
    }

    public void setX(String x) {
        X = x;
    }

    public String getY() {
        return Y;
    }

    public void setY(String y) {
        Y = y;
    }

    public String getZ() {
        return Z;
    }

    public void setZ(String z) {
        Z = z;
    }
}
