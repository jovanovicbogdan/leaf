export default interface TestDataProvider<T> {
  /**
   * Retrieve test data from a data source.
   *
   * @param filePath a path to file containing test data
   *
   * @returns A promise that resolves to an array of test data of type T.
   */
  getTestData(filePath?: string): Promise<T>;
}
