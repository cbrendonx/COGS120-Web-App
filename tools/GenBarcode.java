/*
 * Filename: GenBarcode.java
 * Author: Brendon Chen
 * Description: This is a short program that generates barcodes.
 *
 * Paste the generated barcodes here:
 * https://www.barcodesinc.com/generator/index.php
 *
 * Click on "Advanced Options"
 * Height: 100
 * Symbology: Code 128-C (numeric only)
 */

import java.util.*;

/**
 * Short program that generates barcodes.
 */
public class GenBarcode {

  // Decimal base.
  public final int BASE = 10;

  /**
   * The main method that actually calls the generate method.
   */
  public static void main(String[] args) {
    GenBarcode g = new GenBarcode();
    System.out.println(g.gen(12));
  }

  /**
   * Generates a barcode that is numDigits long.
   *
   * @param numDigits
   * @return The numDigits-long barcode.
   */
  public String gen(int numDigits) {

    Random rand = new Random();
    String ret = "";

    for (int i = 0; i < numDigits; i++) {
      ret = ret + rand.nextInt(BASE);
    }

    return ret;
  }
}
