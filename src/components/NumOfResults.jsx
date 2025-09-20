const NumOfResults = ({ movies, isLoading }) => {
  return (
    <p className="num-results">
      {!isLoading ? (
        movies?.length > 0 ? (
          <span>Found {<strong>{movies?.length}</strong>} results</span>
        ) : (
          <span>No results</span>
        )
      ) : (
        <span>Loading...</span>
      )}
    </p>
  );
};

export default NumOfResults;
