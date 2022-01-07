%lang starknet
%builtins pedersen range_check

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_not_zero

####################
# STORAGE VARIABLES
####################

@storage_var
func counter() -> (count: felt):
end

####################
# CONSTRUCTOR
####################
@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}():
    counter.write(0)

    return ()
end

####################
# GETTERS FUNCTION
####################
@view
func get_count{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (count: felt):
    let (count) = counter.read()
    return (count)
end

####################
# EXTERNAL FUNCTIONS
####################
@external
func increment{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (count: felt):
    let (count) = counter.read()
    counter.write(count + 1)

    let (new_count) = counter.read()

    return (count=new_count)
end

@external
func decrement{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (count: felt):
    let (count) = counter.read()
    assert_not_zero(count)
    
    counter.write(count - 1)

    let (new_count) = counter.read()

    return (count=new_count)
end
