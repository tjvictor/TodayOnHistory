package stock;

import stock.utils.CommonUtils;

import java.util.Calendar;

public class MainTest {
    public static void main(String[] args){
//        double num1 = Math.ceil(Double.parseDouble("2.41203641069e+11"));
//        BigDecimal bd1 = new BigDecimal(num1);
//        System.out.println(bd1.toString());

//        Date date = new Date();
//        SimpleDateFormat dateFm = new SimpleDateFormat("EEE");
//        String currSun = dateFm.format(CommonUtils.getDate("2018-07-01"));
//        System.out.println(currSun);

        Calendar cal = Calendar.getInstance();
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.setTime(CommonUtils.getDate("2018-06-25"));
        System.out.println(cal.get(Calendar.DAY_OF_WEEK));

        cal.setTime(CommonUtils.getDate("2018-06-26"));
        System.out.println(cal.get(Calendar.DAY_OF_WEEK));

        cal.setTime(CommonUtils.getDate("2018-06-27"));
        System.out.println(cal.get(Calendar.DAY_OF_WEEK));

        cal.setTime(CommonUtils.getDate("2018-06-28"));
        System.out.println(cal.get(Calendar.DAY_OF_WEEK));

        cal.setTime(CommonUtils.getDate("2018-06-29"));
        System.out.println(cal.get(Calendar.DAY_OF_WEEK));

        cal.setTime(CommonUtils.getDate("2018-06-30"));
        System.out.println(cal.get(Calendar.DAY_OF_WEEK));

        cal.setTime(CommonUtils.getDate("2018-07-01"));
        System.out.println(cal.get(Calendar.DAY_OF_WEEK));
    }
}
