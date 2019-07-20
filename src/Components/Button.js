/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = (label, onPress, styles) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.button}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export default Button;
