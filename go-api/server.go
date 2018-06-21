package main

import (
	"encoding/json"
	"log"
	"net/http"
	"fmt"

	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type (
	Book struct {
		Isbn   string   `json:"isbn"`
		Title  string   `json:"title"`
		Author string `json:"authors"`
		Price  string   `json:"price"`
	}
)

func home(w http.ResponseWriter, r*http.Request) {
	fmt.Fprintf(w, "Welcome")
}

func allBooks(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var books []Book
		err := session.DB("store").C("books").Find(bson.M{}).All(&books)
		if err != nil {

		}

		respBody, err := json.MarshalIndent(books, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(200)
		w.Write(respBody)
	}
}

func findBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		session := s.Copy()
		defer session.Close()

		vars := mux.Vars(r)
		isbn := vars["isbn"]

		var book []Book

		err := session.DB("store").C("books").Find(bson.M{"isbn": isbn}).All(&book)

		if err != nil {
		}

		respBody, err := json.MarshalIndent(book, "", "  ")

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
		w.Header().Set("Access-Control-Allow-Origin", "*")		
		w.WriteHeader(200)
		w.Write(respBody)
	}
}

func deleteBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		vars := mux.Vars(r)
		isbn := vars["isbn"]

		err := session.DB("store").C("books").Remove(bson.M{"isbn": isbn})
		if err != nil {
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, DELETE")
		w.WriteHeader(http.StatusNoContent)

	}
}

func createBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var book Book

		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&book)
		if err != nil {
		}

		err = session.DB("store").C("books").Insert(book)
		if err != nil {
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Location", r.URL.Path+"/"+book.Isbn)
		w.WriteHeader(http.StatusNoContent)
	}
}

func updateBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		vars := mux.Vars(r)
		isbn := vars["isbn"]

		var book Book
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&book)
		if err != nil {
		}

		err = session.DB("store").C("books").Update(bson.M{"isbn": isbn}, &book)
		if err != nil {
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(http.StatusNoContent)

	}
}

func main() {
	session, err := mgo.Dial("mongodb://gobooks:gobooks@ds261429.mlab.com:61429/store")
	if err != nil {
	}

	defer session.Close()

	r := mux.NewRouter()
	
	r.HandleFunc("/", home).Methods("GET")
	r.HandleFunc("/books", allBooks(session)).Methods("GET")
	r.HandleFunc("/books/{isbn}", findBook(session)).Methods("GET")
	r.HandleFunc("/books/{isbn}", deleteBook(session)).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/books", createBook(session)).Methods("POST")
	r.HandleFunc("/books/{isbn}", updateBook(session)).Methods("PUT")
	log.Println("[ Server is Running on port :8081 ]")
	log.Fatal(http.ListenAndServe(":8081", r))
}

