package io.github.arakat.arakatcommunity.model.response;

public class DagStats {

    private String color;
    private int count;
    private String state;
    private String dagId;

    public DagStats(String color, int count, String state, String dagId) {
        this.color = color;
        this.count = count;
        this.state = state;
        this.dagId = dagId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDagId() {
        return dagId;
    }

    public void setDagId(String dagId) {
        this.dagId = dagId;
    }
}
