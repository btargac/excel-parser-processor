import generateFileName from './generateFileName';

test('generateFileName should be a function', () => {
  expect(typeof generateFileName).toBe('function');
});

test('should generate the correct file name when file name is extension free', () => {
  const fileName = generateFileName('sample', 'jpg');

  expect(fileName).toBe('sample.jpg');
});


test('should generate the correct file name when file name has an extension', () => {
  const fileName = generateFileName('sample.avif', 'avif');

  expect(fileName).toBe('sample.avif');
});

test('should generate the correct file name when file name is erroneous', () => {
  const fileName = generateFileName('sample.', 'gif');

  expect(fileName).toBe('sample..gif');
});
