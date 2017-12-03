import java.util.*;

public class GenBarcode {
  public final int BASE = 10;

  public static void main(String[] args) {
    GenBarcode g = new GenBarcode();
    System.out.println(g.gen(12));
  }

  public String gen(int numDigits) {

    Random rand = new Random();
    String ret = "";

    for (int i = 0; i < numDigits; i++) {
      ret = ret + rand.nextInt(BASE);
    }

    return ret;
  }
}
