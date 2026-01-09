package com.egroupbuy.model;

public class Brand {
    int brand_id;
    String brand_name;
    String description;
    String icon;

    public Brand() {
        super();
    }

    public Brand(int id, String Brand_name, String description, String icon, int parent) {
        super();
        this.brand_id = id;
        this.brand_name = brand_name;
        this.description = description;
        this.icon = icon;
    }

    public int getBrand_id() {
        return brand_id;
    }

    public void setBrand_id(int id) {
        this.brand_id = id;
    }

    public String getBrand_name() {
        return brand_name;
    }

    public void setBrand_name(String title) {
        this.brand_name = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
