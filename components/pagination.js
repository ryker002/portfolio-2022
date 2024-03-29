import PropTypes from "prop-types";

import { Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({ pageContext, page, setPage }) => {
  return (
    <ButtonGroup
      variant='outline'
      className='pagination'
      role='navigation'
      mt={3}
      spacing={6}
    >
      {pageContext?.prev && (
        <Button onClick={() => setPage(pageContext.prev)} rel='prev'>
          Previous
        </Button>
      )}
      {pageContext?.pages > 1 && (
        <Button className='pagination-location' disabled>
          Page {page} of {pageContext.pages}
        </Button>
      )}

      {pageContext?.next && (
        <Button onClick={() => setPage(pageContext.next)} rel='next'>
          Next
        </Button>
      )}
    </ButtonGroup>
  );
};

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default Pagination;
