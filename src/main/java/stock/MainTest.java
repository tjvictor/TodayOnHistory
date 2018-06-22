package stock;

import java.math.BigDecimal;

public class MainTest {
    public static void main(String[] args){
        double num1 = Math.ceil(Double.parseDouble("2.41203641069e+11"));
        BigDecimal bd1 = new BigDecimal(num1);
        System.out.println(bd1.toString());
    }
}
