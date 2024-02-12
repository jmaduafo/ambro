import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import SearchEngine from '../SearchEngine'
import { COLORS } from '../../constant/default'
import Listing from '../Listing'
import pic from '../../assets/icon.png'
import { useNavigation } from '@react-navigation/native';
import generalStyles from '../../constant/generalStyles'
import { getAllUsers, getAllRecipes } from '../../firebase/firebaseOperations'

const SearchListings = () => {
    const { navigate } = useNavigation()
    const [ loading, setLoading ] = useState(false)

    const [ search, setSearch ] = useState('')

    const [ allUsers, setAllUsers ] = useState(null)
    const [ allRecipes, setAllRecipes ] = useState(null)
    
    const [ filterUsers, setFilterUsers ] = useState([])
    const [ filterRecipes, setFilterRecipes ] = useState([])
    const [ filterCategories, setFilterCategories ] = useState([])
    const [ filterCuisine, setFilterCuisine ] = useState([])

    useMemo(function() {
        setLoading(true)
        getAllUsers(setAllUsers)
        getAllRecipes(setAllRecipes)
        setLoading(false)
    }, [])

    function handleSearch() {
        if (search.length) {
            setFilterUsers(allUsers?.filter(user => user?.name?.toLowerCase().includes(search.toLowerCase())))
            setFilterRecipes(allRecipes?.filter(recipe => recipe?.recipeName?.toLowerCase().includes(search.toLowerCase())))
            // setFilterCategories(allRecipes?.filter(recipe => recipe?.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))))
            setFilterCuisine(allRecipes?.filter(recipe => recipe?.cuisine?.includes(search.toLowerCase())))
        }
    }

    useEffect(function() {
        handleSearch()
    }, [search])

  return (
    <SafeAreaView style={generalStyles.default}>
      <SearchEngine setSearch={setSearch} search={search} marginTop={20} marginBottom={10} placeholderText={'Search'}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
            <View>
                {/* {filterCategories && filterCategories?.length ? <Text style={styles.searchTitle}>Categories</Text> : null}
                {!loading ? 
                    (filterCategories?.length ? 
                        filterCategories?.map(category => {
                        return (
                            <Pressable key={category.id} onPress={() => navigate('SearchViewAll', { category: category})}>
                                {category?.tag?.find(tag => tag.toLowerCase().includes(search.toLowerCase())).map(list => {
                                    return <Listing name={list} />
                                })}
                            </Pressable>
                        )
                        })
                        :
                        <View style={{ marginTop: 10, marginBottom: 10}}></View>
                    )
                    :
                    <ActivityIndicator size={'small'} color={COLORS.textColorFull}/>
                } */}
                {!loading ? 
                    (filterCuisine?.length ? 
                        filterCuisine?.map(category => {
                        return (
                            <Pressable key={category.id} onPress={() => navigate('SearchViewAll', { category: category})}>
                                <Listing name={category.cuisine} image={pic} />
                            </Pressable>

                        )
                        })
                        :
                        <View></View>
                    )
                    :
                    <ActivityIndicator size={'small'} color={COLORS.textColorFull}/>
                }
            </View>
        </View>
        <View style={styles.searchSection}>
            {filterRecipes && filterRecipes?.length ? <Text style={styles.searchTitle}>Recipes</Text> : null}
            <View>
                {!loading ? 
                    (filterRecipes?.length ? 
                        filterRecipes?.map(recipe => {
                        return (
                            <Pressable key={recipe.id} onPress={() => navigate('SearchRecipeDisplay', { item: recipe })}>
                                <Listing name={recipe.recipeName} image={pic} />
                            </Pressable>

                        )
                        })
                        :
                        <View></View>
                    )
                    :
                    <ActivityIndicator size={'small'} color={COLORS.textColorFull}/>
                }
            </View>
        </View>
        <View style={styles.searchSection}>
            {filterUsers && filterUsers?.length ? <Text style={styles.searchTitle}>Users</Text> : null}
            <View>
                {!loading ? 
                    (filterUsers?.length ? 
                        filterUsers?.map(user => {
                        return (
                            <Pressable key={user.id} onPress={() => navigate('SearchUserPage', { user: user })}>
                                <Listing searchType='user' username={user.username} name={user.name} image={pic} id={user.id}/>
                            </Pressable>
                        )
                        })
                        :
                        <View></View>
                    )
                    :
                    <ActivityIndicator size={'small'} color={COLORS.textColorFull}/>
                }
            </View>
        </View>      
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default SearchListings

const styles = StyleSheet.create({
    searchSection: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 15,
        marginBottom: 15
    },
    searchTitle: {
        fontFamily: 'Satoshi-Medium',
        letterSpacing: -1,
        fontSize: 16,
        color: COLORS.textColorFull,
        marginBottom: 5
    }
})