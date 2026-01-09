package com.egroupbuy.model;

public class Category {
    int category_id;
    String category_name;
    String description;
    String icon;
    int parent_id;

    public Category() {
        super();
    }

    public Category(int id, String category_name, String description, String icon, int parent) {
        super();
        this.category_id = id;
        this.category_name = category_name;
        this.description = description;
        this.icon = icon;
        this.parent_id = parent;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int id) {
        this.category_id = id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String title) {
        this.category_name = title;
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

    public int getParent_id() {
        return parent_id;
    }

    public void setParent_id(int parent) {
        this.parent_id = parent;
    }

}
